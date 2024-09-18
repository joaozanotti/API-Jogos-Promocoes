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
const CatalogoIPesquisavel_1 = require("./CatalogoIPesquisavel");
const ItemController_1 = require("./ItemController");
const Jogo_1 = require("./Jogo");
const Promocao_1 = require("./Promocao");
const criarDados = () => {
    console.log("\n----- Testes com dados criados -----");
    // Criando as promoções
    const promocao1 = new Promocao_1.Promocao(100, 75, 25);
    const promocao2 = new Promocao_1.Promocao(103, 77, 27);
    // Criando os itens
    const item1 = new Jogo_1.Jogo(191, "PUBG", [promocao1]);
    const item2 = new Jogo_1.Jogo(256, "CS2");
    // Criando o catálogo
    const catalogo = new CatalogoIPesquisavel_1.CatalogoIPesquisavel([item1, item2]);
    // Criando o controller
    const itemController = new ItemController_1.ItemController(catalogo);
    console.log("\n--- Listagem de todos os itens ---");
    itemController.listarItens();
    console.log("\n--- Remoção de item ---");
    //itemController.removerItem(item1);
    console.log("\n--- Adição de item ---");
    itemController.adicionarItem(item2);
    itemController.listarItens();
    console.log("\n--- Adição de promoção ao item ---");
    itemController.adicionarPromocaoItem(promocao2, item1);
    itemController.adicionarPromocaoItem(promocao1, item2);
    itemController.listarItens();
    console.log("\n--- Remoção de promoção ao item ---");
    itemController.removerPromocaoItem(promocao2, item2);
    itemController.listarItens();
};
criarDados();
const buscarDados = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\n----- Testes API -----");
    // Criando o controller dos itens
    const itemController = new ItemController_1.ItemController();
    // Buscando os dados dos itens da api e listando todos
    yield itemController.buscarEAdicionarItens();
    console.log("\n--- Todos os itens da API ---");
    itemController.listarItens();
    // Pesquisando os itens pelo critério e exibindo apenas os itens pesquisados
    const itensPesquisados = itemController.pesquisarPorCriterio("Edition");
    console.log("\n--- Itens pesquisados ---");
    itemController.listarItens(itensPesquisados);
});
buscarDados();
//# sourceMappingURL=index.js.map