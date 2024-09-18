import { IPesquisavel } from "./IPesquisavel";
import { Promocao } from "./Promocao";

export abstract class Item implements IPesquisavel{
    private static _qtdItens: number = 1;
    private _id: number;
    private _titulo: string;
    private _promocoes: Promocao[];
    
    constructor(titulo: string, promocoes?: Promocao[]) {
        this._id = Item._qtdItens++;
        this._titulo = titulo;
        this._promocoes = promocoes !== undefined && promocoes?.length > 0 ? promocoes : [];
    }

    get id(): number {
        return this._id;
    }

    get titulo(): string {
        return this._titulo;
    }
    
    set titulo(novoValor: string)  {
        if (novoValor !== "") {
            this._titulo = novoValor;
        }        
    }

    get promocoes(): Promocao[] {
        return this._promocoes;
    }

    set promocoes(novoValor: Promocao[]) {
        if (novoValor.length !== 0) {
            this._promocoes = novoValor;
        }
    }

    adicionarPromocao(promocao: Promocao): void {
        this._promocoes.push(promocao);
    }

    removerPromocao(promocao: Promocao): void {
        this._promocoes = this._promocoes.filter(e => e !== promocao);
    }

    atendeCriterio(criterio: string): boolean {
        if (this._titulo.toUpperCase().includes(criterio.toUpperCase())) {
            return true;
        }
        return false;
    }

    toString(): string {
        return "\nJogo: " + this._titulo + 
                "\nPromoções: " + this._promocoes.map(promo => promo.toString()).join("\n");
    }
}