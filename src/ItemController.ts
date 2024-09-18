import { CatalogoIPesquisavel } from "./CatalogoIPesquisavel";
import { IPesquisavel } from "./IPesquisavel";
import { Jogo } from "./Jogo";
import { Promocao } from "./Promocao";
import { Item } from "./Item";

export class ItemController {
    private _catalogoItens: CatalogoIPesquisavel;

    constructor(catalogo?: CatalogoIPesquisavel) {
        this._catalogoItens = catalogo !== undefined ? catalogo : new CatalogoIPesquisavel();
    }

    get catalogoItens(): CatalogoIPesquisavel {
        return this._catalogoItens;
    }

    async buscarEAdicionarItens(): Promise<void> {
        await this.buscarIdsItens()
            .then(async (fromResolve: string[]) => {
                await this.buscarItensEPromocoes(fromResolve);
            });
    }

    async buscarIdsItens(): Promise<string[]> {
        try {
            const response = await fetch("https://www.cheapshark.com/api/1.0/deals");
            const data = await response.json();
    
            // Pegando o ID de 5 jogos que estão em promoção e retornando diretamente
            return data.slice(0, 5).map((e: any) => e.gameID);
    
        } catch (error) {
            console.error("Erro ao buscar dados da API: ", error);
            // Retornando um array vazio em caso de erro
            return [];
        }
    }

    async buscarItensEPromocoes(vetIdsItens: string[]): Promise<void> {
        try {
            if (vetIdsItens.length === 0) {
                throw new RangeError("O vetor de ids está vazio");

            } else {
                // Criando a string para realizar a requisição
                const ids = vetIdsItens.join(",");
                const response = await fetch(`https://www.cheapshark.com/api/1.0/games?ids=${ids}&format=array`);
                const data = await response.json();

                const promisePromocoesJogos: Promise<Item>[] = data.map((jogo: any) => {
                    // Criando um novo jogo
                    const novoJogo = new Jogo(Number(jogo.info.gameID), jogo.info.title);

                    // Criando o vetor de promoções desse jogo
                    const promocoes = jogo.deals.map((promocao: any) => {
                        return new Promocao(Number(promocao.retailPrice), Number(promocao.savings), Number(promocao.price));
                    });

                    // Adicionando apenas promoções ativas (desconto > 0) ao jogo criado
                    promocoes.forEach((promocao: Promocao) => {
                        if (promocao.desconto > 0) {
                            novoJogo.promocoes.push(promocao);
                        }
                    });

                    // Retornado o jogo contendo o vetor de promoções
                    return novoJogo;
                });
                // Adicionando todos os jogos buscados ao nosso catálogo
                this._catalogoItens = new CatalogoIPesquisavel(await Promise.all(promisePromocoesJogos));
            }

        } catch (error) {
            console.error("Erro ao buscar dados das promoções: ", error);
        }
    }

    buscarItemPorId(id: number): IPesquisavel | undefined {
        const itemEncontrado = this._catalogoItens.pesquisarPorId(id);

        if (itemEncontrado) {
            return itemEncontrado;
        } else {
            return undefined;
        }
    }

    adicionarItem(item: IPesquisavel): void {
        const itemEncontrado = this.buscarItemPorId((item as Item).id);
        
        if (itemEncontrado) {
            console.error("Este item já existe.");
            
        } else {
            this._catalogoItens.adicionar(item);
            console.log("Item adicionado com sucesso!");
        }
    }

    removerItem(item: IPesquisavel): void {
        const itemEncontrado = this.buscarItemPorId((item as Item).id);

        if (!itemEncontrado) {
            console.error("Item não encontrado.");
            
        } else {
            this._catalogoItens.remover(item);
            console.log("Item removido com sucesso!");
        }
    }

    listarItens(array?: IPesquisavel[]): void {
        const itensParaListar = array && array.length > 0 ? array : this._catalogoItens.itens;

        if (itensParaListar.length === 0) {
            console.error("Nenhum item encontrado.");

        } else {
            itensParaListar.forEach(item => {
                console.log(item.toString());
            });
        }
    }

    pesquisarPorCriterio(criterio: string): IPesquisavel[] {
        const itensEncontrados = this._catalogoItens.pesquisarPorCriterio(criterio);
        return itensEncontrados;
    }

    adicionarPromocaoItem(promocao: Promocao, item: IPesquisavel): void {
        const itemEncontrado = this.buscarItemPorId((item as Item).id);

        if (itemEncontrado) {
            (itemEncontrado as Item).adicionarPromocao(promocao);
            console.log("Promoção adicionada com sucesso!");
            
        } else {
            console.error("Item não encontrado.");
        }
    }
    
    removerPromocaoItem(promocao: Promocao, item: IPesquisavel): void {
        const itemEncontrado = this.buscarItemPorId((item as Item).id);

        if (itemEncontrado) {
            (itemEncontrado as Item).removerPromocao(promocao);
            console.log("Promoção removida com sucesso!");

        } else {
            console.error("Item não encontrado.");
        }
    }
}