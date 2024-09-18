import { Promocao } from "./Promocao";
import { Item } from "./Item";

export class Jogo extends Item {
    private _gameID: number;

    constructor(gameID: number, titulo: string, promocoes: Promocao[] = []) {
        super(titulo, promocoes);
        this._gameID = gameID;
    }

    get gameID(): number {
        return this._gameID;
    }

    toString(): string {
        return "\nGameID: " + this._gameID +
               super.toString();
    }
}