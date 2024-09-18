export class Promocao {
    private static _qtdItens: number = 1;
    private _id: number;
    private _precoTotal: number;
    private _desconto: number;
    private _precoDesconto: number;
    
    constructor(precoTotal: number, desconto: number, precoDesconto: number) {
        this._id = Promocao._qtdItens++;
        this._precoTotal = precoTotal;
        this._desconto = desconto;
        this._precoDesconto = precoDesconto;
    }

    get id(): number {
        return this._id;
    }

    get precoTotal(): number {
        return this._precoTotal;
    }

    set precoTotal (novoValor: number){
        if (novoValor !== 0) {
            this._desconto = novoValor;
        }
    }

    get desconto(): number {
        return this._desconto;
    }

    set desconto (novoValor: number){
        if (novoValor !== 0) {
            this._desconto = novoValor;
        }
    }

    get precoDesconto(): number {
        return this._precoDesconto;
    }

    set precoDesconto (novoValor: number){
        if (novoValor !== 0) {
            this._precoDesconto = novoValor;
        }
    }

    toString(): string {
        return "\nPreço original: R$" + this._precoTotal.toFixed(2) + 
               "\nDesconto: " + this._desconto.toFixed(2) + "%" +
               "\nPreço com desconto: R$" + this._precoDesconto.toFixed(2);
    }
}