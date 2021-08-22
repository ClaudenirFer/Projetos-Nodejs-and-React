const express = require("express");
const app = express();

const port = 3000;

// Para trabalhar com json nas requisições
app.use(express.json());

const games = [
  {
    id: 1,
    name: "Free Fire",
    imageUrl:
      "https://s2.glbimg.com/Fd4E3MNILyMr8GMDSrLj-ze-_Y0=/0x265:1892x1264/984x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2018/04/10/free_fire.png",
  },
  {
    id: 2,
    name: "FIFA 21",
    imageUrl:
      "https://s2.glbimg.com/f5UpJFXD2wQR3-HMNa927HxTd7c=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/r/7/mSrPjAQTq0uFHNHiBjpQ/fifa-21-intros.jpg",
  },
  {
    id: 3,
    name: "Need For Speed",
    imageUrl:
      "https://3.bp.blogspot.com/-wdtQj5nuXOI/W_kwgLulm8I/AAAAAAAABNY/EpZ5Vo_NA8skZRJ5ypjV7jMhgwsL2YWFwCLcBGAs/s640/capa.png",
  },
  {
    id: 4,
    name: "Tetris",
    imageUrl:
      "https://boasnovasmg.com.br/wp-content/uploads/2018/11/tetris-696x392.jpeg",
  },
  {
    id: 5,
    name: "Battlefield",
    imageUrl:
      "https://data4.origin.com/asset/content/dam/originx/web/app/games/battlefield/battlefield-4/screenshots/battlefield-4/1010268_screenhi_930x524_en_US_11.jpg/1e88769f-5a6f-4bb5-80fd-fdb4b5ec53ee/original.jpg",
  },
  {
    id: 6,
    name: "SWAT 4",
    imageUrl:
      "https://cdn.ome.lt/0ONj1M0G9Y-zSOzTkrBEmbtpX3U=/770x0/smart/uploads/conteudo/fotos/SWAT_4.jpg",
  },
  {
    id: 7,
    name: "Microsoft Flight Simulator - PC",
    imageUrl:
      "https://s2.glbimg.com/xefZRLocH3R7pCs57lM48gYm0Mw=/0x0:3840x1635/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/m/M/40ipBESe6ibdp8iUi0MA/kittyhawk-e3-withlogo-003-2.jpg",
  },
];

//Sortea um número aleatório entre 1 e 7, onde o número 7, que é o tamanho da lista, também está incluso. O número sorteado será o id do jogo a ser jogado e aparecerá com o seu id e o link.
function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Filtra todas as posições nulls, retornando os não nulls.
function getGamesValid() {
  return games.filter(Boolean); // Método filter, retorna os não null.
}

//Recebe um id, filtra as posições nulas. Compara e retorna um objeto para que a invocou.
const getGamesById = (id) => getGamesValid().find((game) => game.id === id);

//Recebe um id. Filtra as posições nulas. Faz comparações, retornando o Índice do obj, onde o id é igual ao parâmetro recebido, e depois retorna o Índice do obj procurado.
const getIndexByGame = (id) =>
  getGamesValid().findIndex((game) => game.id === id);

// ---- ROTA INICIAL ------
app.get("/", (req, res) => {
  res.send("Welcome to My Games List!");
});

// -- ROTA Mostrar todos os games em que as posições do Array não são nulas
app.get("/games", (req, res) => {
  res.send(games.filter(Boolean));
});

// -- ROTA Mostar jogo pelo id
app.get("/games/:id", (req, res) => {
  const id = parseInt(req.params.id); //Converte o valor que chega por parâmetro para o tipo inteiro
  const game = getGamesById(id);

  if (!game) {
    res.send("Jogo não encontrado");
  } else {
    res.send(game);
  }
});

//Rota Random -- Sugestão de jogo. Sorteia um número de 1 a 7, onde o 7 está incluso nas possibilidades aleatórias.
app.get("/random-games", (req, res) => {
  const id = randomMinMax(1, 7);
  const game = getGamesById(id);

  if (!game) {
    res.send("Jogo não encontrado");
  } else {
    res.send(game);
  }
});

// ROTA q cadastra um novo jogo
//Lista - GET
//Cadastrar - POST
//Atualizar - PUT
//Apagar - DELETE

// -- ROTA Cadastrar novo jogo
app.post("/games", (req, res) => {
  const game = req.body;

  //Verifica se o jogo e as posições requisitadas no body são vazias ou não.
  if (!game || !game.name || !game.imageUrl) {
    res.status(400).send({
      message: "Jogo Inválido. Tente novamente",
    });
    return;
  }

  //Recupera a posição do último jogo
  const lastGame = games[games.length - 1];

  //Verifica se há jogo, se sim, recebe o id do ultimo jogo +1 e atribui como o id do novo jogo e coloca-o na lista games, se não há jogo, ele recebe o id 1, pois será o primeiro da lista
  if (games.length) {
    game.id = lastGame.id + 1;
    games.push(game);
  } else {
    game.id = 1;
    games.push(game);
  }

  // Mostra o id e o nome do jogo adicionado
  res.send(
    `Jogo adicionado com sucesso!\nNome do novo jogo: ${game.name}\nID: ${game.id}`
  );
});

// -- ROTA Atualiza e/ou Edita o jogo
app.put("/games/:id", (req, res) => {
  const id = +req.params.id; // converte o id q chega por parâmetro para o tipo inteiro

  //Chama a função q passa o id do objeto procurado por parâmetro. A função valida as posições, procura o id entre as posições não nullas do Array, se achar, guarda e retorna o Índice do objeto encontrado.
  const gameIndex = getIndexByGame(id);

  if (gameIndex < 0) {
    res.status(404).send({
      message: "O jogo não foi encontrado, tente novamente.",
    });
    return;
  }

  const newGame = req.body;

  //Verifica se as chaves do json NÃO estão com valores para serem passados.
  if (!Object.keys(newGame).length) {
    res.status(400).send({
      message: "O body esta vazio!",
    });
    return;
  }

  //Verifica se o jogo e as posições requisitadas no body são vazias ou não.
  if (!newGame || !newGame.name || !newGame.imageUrl) {
    res.status(400).send({
      message: "Jogo invalido, tente novamente.",
    });
    return;
  }

  //Chama a função que irá validar as posições e procurar o jogo com base no id passado por parâmeto, retornando o obj.
  const game = getGamesById(id);

  //Aquiu o índice é retornado pela função getIndexByGame(id)e  é usado para fazer a troca dos jogos
  games[gameIndex] = {
    ...game,
    ...newGame,
  };

  res.send(games[gameIndex]);
});

// -- ROTA Deletar jogo recebendo o id
app.delete("/games/:id", (req, res) => {
  const id = +req.params.id;

  const gameIndex = getIndexByGame(id); //Função já explicada na rota anterior. Retorna o índice do elemento encontrado, se encontrar.

  if (gameIndex < 0) {
    res.status(404).send({
      message: "Jogo não encontrado, ....",
    });
    return;
  }

  //Guardo o objeto de forma temporária apenas para mostrar ao usuário o jogo que foi deletado.
  const gameDeleted = games[gameIndex];

  //Remove 1 jogo pelo índice encontrado pela função getIndexByGame(id) no início do da rota.
  games.splice(gameIndex, 1);
  res.send({
    message: `Jogo ${gameDeleted.name} removido com sucesso`,
  });
});

// Mostra que o host está rodando na porta 3000
app.listen(port, function () {
  console.log(`App rodando na porta http://localhost:${port}/`);
});
