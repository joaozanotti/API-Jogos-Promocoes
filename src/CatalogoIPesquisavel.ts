import { IPesquisavel } from "./IPesquisavel";
import { Item } from "./Item";

export class CatalogoIPesquisavel {
    private _itens: IPesquisavel[];

    constructor(itensPesquisaveis?: IPesquisavel[]) {
        this._itens = itensPesquisaveis !== undefined && itensPesquisaveis?.length > 0 ? itensPesquisaveis : [];
    }

    get itens(): IPesquisavel[] {
        return this._itens;
    }

    set itens(novosItens: IPesquisavel[]) {
        if (novosItens.length !== 0) {
            this._itens = novosItens;
        }
    }

    adicionar(item: IPesquisavel): void {
        this._itens.push(item);
    }

    remover(item: IPesquisavel): void {
       this._itens = this._itens.filter(e => e !== item);
    }

    pesquisarPorId(id: number): IPesquisavel | undefined {
        const itemEncontrado = this._itens.find(e => (e as Item).id === id);
        return itemEncontrado;
    }
  
    pesquisarPorCriterio(criterio: string): IPesquisavel[] {
        const itensEncontrados: IPesquisavel[] = this._itens.filter(item => item.atendeCriterio(criterio));
        return itensEncontrados;
    }
}