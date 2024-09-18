"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const CatalogoIPesquisavel_1 = require("./CatalogoIPesquisavel");
const Jogo_1 = require("./Jogo");
const Promocao_1 = require("./Promocao");
class ItemController {
    constructor(catalogo) {
        this._catalogoItens = catalogo !== undefined ? catalogo : new CatalogoIPesquisavel_1.CatalogoIPesquisavel();
    }
    get catalogoItens() {
        return this._catalogoItens;
    }
    buscarEAdicionarItens() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarIdsItens()
                .then((fromResolve) => __awaiter(this, void 0, void 0, function* () {
                yield this.buscarItensEPromocoes(fromResolve);
            }));
        });
    }
    buscarIdsItens() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("https://www.cheapshark.com/api/1.0/deals");
                const data = yield response.json();
                // Pegando o ID de 5 jogos que estão em promoção e retornando diretamente
                return data.slice(0, 5).map((e) => e.gameID);
            }
            catch (error) {
                console.error("Erro ao buscar dados da API: ", error);
                // Retornando um array vazio em caso de erro
                return [];
            }
        });
    }
    buscarItensEPromocoes(vetIdsItens) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (vetIdsItens.length === 0) {
                    throw new RangeError("O vetor de ids está vazio");
                }
                else {
                    // Criando a string para realizar a requisição
                    const ids = vetIdsItens.join(",");
                    const response = yield fetch(`https://www.cheapshark.com/api/1.0/games?ids=${ids}&format=array`);
                    const data = yield response.json();
                    const promisePromocoesJogos = data.map((jogo) => {
                        // Criando um novo jogo
                        const novoJogo = new Jogo_1.Jogo(Number(jogo.info.gameID), jogo.info.title);
                        // Criando o vetor de promoções desse jogo
                        const promocoes = jogo.deals.map((promocao) => {
                            return new Promocao_1.Promocao(Number(promocao.retailPrice), Number(promocao.savings), Number(promocao.price));
                        });
                        // Adicionando apenas promoções ativas (desconto > 0) ao jogo criado
                        promocoes.forEach((promocao) => {
                            if (promocao.desconto > 0) {
                                novoJogo.promocoes.push(promocao);
                            }
                        });
                        // Retornado o jogo contendo o vetor de promoções
                        return novoJogo;
                    });
                    // Adicionando todos os jogos buscados ao nosso catálogo
                    this._catalogoItens = new CatalogoIPesquisavel_1.CatalogoIPesquisavel(yield Promise.all(promisePromocoesJogos));
                }
            }
            catch (error) {
                console.error("Erro ao buscar dados das promoções: ", error);
            }
        });
    }
    buscarItemPorId(id) {
        const itemEncontrado = this._catalogoItens.pesquisarPorId(id);
        if (itemEncontrado) {
            return itemEncontrado;
        }
        else {
            return undefined;
        }
    }
    adicionarItem(item) {
        const itemEncontrado = this.buscarItemPorId(item.id);
        if (itemEncontrado) {
            console.error("Este item já existe.");
        }
        else {
            this._catalogoItens.adicionar(item);
            console.log("Item adicionado com sucesso!");
        }
    }
    removerItem(item) {
        const itemEncontrado = this.buscarItemPorId(item.id);
        if (!itemEncontrado) {
            console.error("Item não encontrado.");
        }
        else {
            this._catalogoItens.remover(item);
            console.log("Item removido com sucesso!");
        }
    }
    listarItens(array) {
        const itensParaListar = array && array.length > 0 ? array : this._catalogoItens.itens;
        if (itensParaListar.length === 0) {
            console.error("Nenhum item encontrado.");
        }
        else {
            itensParaListar.forEach(item => {
                console.log(item.toString());
            });
        }
    }
    pesquisarPorCriterio(criterio) {
        const itensEncontrados = this._catalogoItens.pesquisarPorCriterio(criterio);
        return itensEncontrados;
    }
    adicionarPromocaoItem(promocao, item) {
        const itemEncontrado = this.buscarItemPorId(item.id);
        if (itemEncontrado) {
            itemEncontrado.adicionarPromocao(promocao);
            console.log("Promoção adicionada com sucesso!");
        }
        else {
            console.error("Item não encontrado.");
        }
    }
    removerPromocaoItem(promocao, item) {
        const itemEncontrado = this.buscarItemPorId(item.id);
        if (itemEncontrado) {
            itemEncontrado.removerPromocao(promocao);
            console.log("Promoção removida com sucesso!");
        }
        else {
            console.error("Item não encontrado.");
        }
    }
}
exports.ItemController = ItemController;
//# sourceMappingURL=ItemController.js.map