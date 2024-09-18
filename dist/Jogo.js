"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jogo = void 0;
const Item_1 = require("./Item");
class Jogo extends Item_1.Item {
    constructor(gameID, titulo, promocoes = []) {
        super(titulo, promocoes);
        this._gameID = gameID;
    }
    get gameID() {
        return this._gameID;
    }
    toString() {
        return "\nGameID: " + this._gameID +
            super.toString();
    }
}
exports.Jogo = Jogo;
//# sourceMappingURL=Jogo.js.map