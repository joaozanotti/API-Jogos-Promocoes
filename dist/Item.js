"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(titulo, promocoes) {
        this._id = Item._qtdItens++;
        this._titulo = titulo;
        this._promocoes = promocoes !== undefined && (promocoes === null || promocoes === void 0 ? void 0 : promocoes.length) > 0 ? promocoes : [];
    }
    get id() {
        return this._id;
    }
    get titulo() {
        return this._titulo;
    }
    set titulo(novoValor) {
        if (novoValor !== "") {
            this._titulo = novoValor;
        }
    }
    get promocoes() {
        return this._promocoes;
    }
    set promocoes(novoValor) {
        if (novoValor.length !== 0) {
            this._promocoes = novoValor;
        }
    }
    adicionarPromocao(promocao) {
        this._promocoes.push(promocao);
    }
    removerPromocao(promocao) {
        this._promocoes = this._promocoes.filter(e => e !== promocao);
    }
    atendeCriterio(criterio) {
        if (this._titulo.toUpperCase().includes(criterio.toUpperCase())) {
            return true;
        }
        return false;
    }
    toString() {
        return "\nJogo: " + this._titulo +
            "\nPromoções: " + this._promocoes.map(promo => promo.toString()).join("\n");
    }
}
exports.Item = Item;
Item._qtdItens = 1;
//# sourceMappingURL=Item.js.map