"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promocao = void 0;
class Promocao {
    constructor(precoTotal, desconto, precoDesconto) {
        this._id = Promocao._qtdItens++;
        this._precoTotal = precoTotal;
        this._desconto = desconto;
        this._precoDesconto = precoDesconto;
    }
    get id() {
        return this._id;
    }
    get precoTotal() {
        return this._precoTotal;
    }
    set precoTotal(novoValor) {
        if (novoValor !== 0) {
            this._desconto = novoValor;
        }
    }
    get desconto() {
        return this._desconto;
    }
    set desconto(novoValor) {
        if (novoValor !== 0) {
            this._desconto = novoValor;
        }
    }
    get precoDesconto() {
        return this._precoDesconto;
    }
    set precoDesconto(novoValor) {
        if (novoValor !== 0) {
            this._precoDesconto = novoValor;
        }
    }
    toString() {
        return "\nPreço original: R$" + this._precoTotal.toFixed(2) +
            "\nDesconto: " + this._desconto.toFixed(2) + "%" +
            "\nPreço com desconto: R$" + this._precoDesconto.toFixed(2);
    }
}
exports.Promocao = Promocao;
Promocao._qtdItens = 1;
//# sourceMappingURL=Promocao.js.map