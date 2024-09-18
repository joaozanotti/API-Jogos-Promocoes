import { CatalogoIPesquisavel } from "./CatalogoIPesquisavel";
import { ItemController } from "./ItemController";
import { Jogo } from "./Jogo";
import { Promocao } from "./Promocao";

const criarDados = () => {
  console.log("\n----- Testes com dados criados -----");

  // Criando as promoções
  const promocao1 = new Promocao(100, 75, 25);
  const promocao2 = new Promocao(103, 77, 27);

  // Criando os itens
  const item1 = new Jogo(191, "PUBG", [promocao1]);
  const item2 = new Jogo(256, "CS2");

  // Criando o catálogo
  const catalogo = new CatalogoIPesquisavel([item1, item2]);

  // Criando o controller
  const itemController = new ItemController(catalogo);
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
}

criarDados();

const buscarDados = async () => {
  console.log("\n----- Testes API -----");

  // Criando o controller dos itens
  const itemController = new ItemController();

  // Buscando os dados dos itens da api e listando todos
  await itemController.buscarEAdicionarItens();
  console.log("\n--- Todos os itens da API ---");
  itemController.listarItens();

  // Pesquisando os itens pelo critério e exibindo apenas os itens pesquisados
  const itensPesquisados = itemController.pesquisarPorCriterio("Edition");
  console.log("\n--- Itens pesquisados ---");
  itemController.listarItens(itensPesquisados);
}

buscarDados();