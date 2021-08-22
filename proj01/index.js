const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const players = [
  {
    id: 1,
    name: "Cristiano Ronaldo",
    imageUrl: "https://www.lance.com.br/files/article_main/uploads/2021/06/23/60d38e1fc5e92.jpeg"
  },
  {
    id: 2,
    name: "Lewandowski",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/Robert_Lewandowski_2018.jpg"
  },
  {
    id: 3,
    name: "Luka modric",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/ISL-HRV_%287%29.jpg/220px-ISL-HRV_%287%29.jpg"
  },
  {
    id: 4,
    name: "Tony Crosss",
    imageUrl: "https://conteudo.imguol.com.br/c/esporte/24/2021/07/02/toni-kroos-anunciou-aposentadoria-da-selecao-da-alemanha-1625228498513_v2_900x506.jpg.webp"
  },
  {
    id: 5,
    name: "De Bruyne",
    imageUrl: "https://premierleaguebrasil.com.br/wp-content/uploads/2019/01/de-bruyne-em-jogo-da-copa-da-inglaterra-1-696x674.jpg"
  },
  {
    id: 6,
    name: "Neymar",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Bra-Cos_%281%29_%28cropped%29.jpg/200px-Bra-Cos_%281%29_%28cropped%29.jpg"
  },
  {
    id: 7,
    name: "Portua",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Courtois_2018_%28cropped%29.jpg/199px-Courtois_2018_%28cropped%29.jpg"
  },
  {
    id: 8,
    name: "Messi",
    imageUrl: "https://einvestidor.estadao.com.br/wp-content/uploads/sites/715/2020/08/messi_270820203744.jpg"
  },
  {
    id: 9,
    name: "Mbape",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg/250px-2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg"
  }
];

function getPlayersValid() {
  return players.filter(Boolean); // Retorna  as posições da lista não nulas.
}

//Recebe um id, filtra as posições nulas. Compara e retorna um objeto para que a invocou.
const getPlayersById = (id) => getPlayersValid().find((player) => player.id === id);

//Recebe um id, filtra as posições nulas. Procura, retornando o Índice do obj, onde o id é igual ao parâmetro passado, e retornando assim o Índice do obj procurado
const getIndexByPlayer = (id) =>
  getPlayersValid().findIndex((player) => player.id === id);




// Entra no endpoint principal
app.get("/", (req, res) => {
  res.send(`<h1> Olá, bem Vindo a minha lista de jogadores </h1>`);
});


// -- Rota Mostrar todos os jogadore nas posições do Array não nulas
app.get("/players", (req, res) => {
  res.send(players.filter(Boolean));
});

// -- Rota Mostar jogador pelo id
app.get("/players/:id", (req, res) => {
  const id = parseInt(req.params.id); //Converte o valor que chega por parâmetro para o tipo inteiro
  const player = getPlayersById(id);

  if (!player) {
    res.send("Jogador não encontrado");
  } else {
    res.send(player);
  }
});


// -- Rota Cadastrar novo jogador
app.post("/players", (req, res) => {
  const player = req.body;

  //Verifica se o jogador e as posições requisitadas no body são vazias ou não.
  if (!player || !player.name || !player.imageUrl) {
    res.status(400).send({
      message: "Jogador Inválido. Tente novamente",
    });
    return;
  }

  //Recupera a posição do último jogador no array
  const lastPlayer = players[players.length - 1];

  //Verifica se há jogador, se sim, recebe o id do ultimo jogador +1 e atribui como o id do novo jogador e coloca-o na lista dos jogadores. Se não há jogador, ele recebe o id 1, pois será o primeiro jogador da lista
  if (players.length) {
    player.id = lastPlayer.id + 1;
    players.push(player);
  } else {
    player.id = 1;
    players.push(player);
  }

  // Mostra o id e o nome do jogador adicionado
  res.send(
    `Jogador adicionado com sucesso!\nNome do novo jogador: ${player.name}\nID: ${player.id}`
  );
});


//Rota Atualiza e/ou Edita jogador
app.put("/players/:id", (req, res) => {
  const id = +req.params.id; // converte o id q chega por parâmetro para o tipo inteiro

  //Chama a função q passa o id do objeto procurado por parâmetro. A função valida as posições, procura o id entre as posições não nullas do Array, se achar, guarda e retorna o Índice do objeto encontrado.
  const playerIndex = getIndexByPlayer(id);

  if (playerIndex < 0) {
    res.status(404).send({
      message: "O jogador não foi encontrado, tente novamente.",
    });
    return;
  }

  const newPlayer = req.body;

  //Verifica se as chaves do json NÃO estão com valores para serem passados.
  if (!Object.keys(newPlayer).length) {
    res.status(400).send({
      message: "O body está vazio!",
    });
    return;
  }

  //Verifica se o jogador e as posições requisitadas no body são vazias ou não.
  if (!newPlayer || !newPlayer.name || !newPlayer.imageUrl) {
    res.status(400).send({
      message: "jogador inválido. Tente novamente.",
    });
    return;
  }

  //Chama a função que irá validar as posições e procurar o jogador com base no id passado por parâmeto, retornando o obj.
  const player = getPlayersById(id);

  //Aquiu o índice é retornado pela função getIndexByPlayer(id)e  é usado para fazer a troca dos jogadores
  players[playerIndex] = {
    ...player,
    ...newPlayer,
  };

  res.send(players[playerIndex]);
});



//Rota Deletar jogador
app.delete("/players/:id", (req, res) => {
  const id = +req.params.id;

  const playerIndex = getIndexByPlayer(id); //Função já explicada na rota anterior. Retorna o índice do elemento encontrado, se encontrar.

  if (playerIndex < 0) {
    res.status(404).send({
      message: "Jogador não encontrado, ....",
    });
    return;
  }

  //Guardo o objeto de forma temporária apenas para mostrar ao usuário o jogador que foi deletado.
  const playerDeleted = players[playerIndex];

  //Remove 1 jogador pelo índice encontrado pela função getIndexByPlayer(id) no início do da rota.
  players.splice(playerIndex, 1);
  res.send({
    message: `Jogador ${playerDeleted.name} removido com sucesso`,
  });
});

// Mostra que o host está rodando na porta 3000
app.listen(port, function () {
  console.log(`App rodando na porta http://localhost:${port}/`);
});
