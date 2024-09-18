"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoIPesquisavel = void 0;
class CatalogoIPesquisavel {
    constructor(itensPesquisaveis) {
        this._itens = itensPesquisaveis !== undefined && (itensPesquisaveis === null || itensPesquisaveis === void 0 ? void 0 : itensPesquisaveis.length) > 0 ? itensPesquisaveis : [];
    }
    get itens() {
        return this._itens;
    }
    set itens(novosItens) {
        if (novosItens.length !== 0) {
            this._itens = novosItens;
        }
    }
    adicionar(item) {
        this._itens.push(item);
    }
    remover(item) {
        this._itens = this._itens.filter(e => e !== item);
    }
    pesquisarPorId(id) {
        const itemEncontrado = this._itens.find(e => e.id === id);
        return itemEncontrado;
    }
    pesquisarPorCriterio(criterio) {
        const itensEncontrados = this._itens.filter(item => item.atendeCriterio(criterio));
        return itensEncontrados;
    }
}
exports.CatalogoIPesquisavel = CatalogoIPesquisavel;
//# sourceMappingURL=CatalogoIPesquisavel.js.map