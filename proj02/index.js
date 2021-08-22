
const express = require("express");
const app = express();

const port = 3000;

// Para trabalhar com json nas requisições
app.use(express.json());


const movies = [
  {
    id: 1,
    name: "Cães de Guerra",
    imageUrl:
      "http://s2.glbimg.com/aYkhroi85GIK7_w-bnQiqlI5gQ8=/620x465/s.glbimg.com/jo/g1/f/original/2016/09/08/caes_31UTgUE.jpg",
  },
  {
    id: 2,
    name: "Corações de Ferro",
    imageUrl:
      "https://www.cineset.com.br/wp-content/uploads/2015/02/fury_movie-wide.jpg",
  },
  {
    id: 3,
    name: "Até o Último Homem",
    imageUrl:
      "https://brasilguns.com.br/blog/wp-content/uploads/2017/10/hacksaw-ridge-2560x1440-2016-movies-hd-3188-1024x576.jpg",
  },
  {
    id: 4,
    name: "A Conquista da Honra",
    imageUrl:
      "https://www.cinemaescrito.com/wp-content/uploads/2018/09/a-conquista-da-honra-910x515.jpg",
  },
  {
    id: 5,
    name: "TO Resgate do Soldado Ryan",
    imageUrl:
      "https://miro.medium.com/max/1400/1*sxJUpbaWdz2fNg73TueQyQ.jpeg",
  },
];

//Arrow Function para validar
//const getFilmesValid = () => movies.filter(Boolean);

//Filtra todas as posições nulls, retornando os não nulls.
function getMoviesValid() {
  return movies.filter(Boolean); // Retorna os não null.
}

//Recebe um id, filtra as posições nulas. Compara e retorna um objeto para que a invocou.
const getMoviesById = (id) => getMoviesValid().find((movie) => movie.id === id);

//Recebe um id, filtra as posições nulas. Procura retornando o Index do obj, onde o id é igual ao parâmetro, retirnando o Index do obj procurado
const getIndexByMovie = (id) =>
  getMoviesValid().findIndex((movie) => movie.id === id);




// ---- ROTA INICIAL ------
app.get("/", (req, res) => {
  res.send("Hello guys,\n Welcome to My Movie List!");
});




// -- Rota Mostrar todos os filmes. Posições do Array não nulas
app.get("/movies", (req, res) => {
  res.send(movies.filter(Boolean));
});

// -- Rota Mostar Filme pelo id
app.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id); //Converte o valor que chega por parâmetro para o tipo inteiro
  const movie = getMoviesById(id);

  if (!movie) {
    res.send("Filme não encontrado");
  } else {
    res.send(movie);
  }
});

// rota q cadastra um novo movie
//Lista - GET
//Cadastrar - POST
//Atualizar - PUT
//Apagar - DELETE

// -- Rota Cadastrar novo movie
app.post("/movies", (req, res) => {
  const movie = req.body;

  //Verifica se o filme e as posições requisitadas no body são vazias ou não.
  if (!movie || !movie.name || !movie.imageUrl) {
    res.status(400).send({
      message: "Filme Inválido. Tente novamente",
    });
    return;
  }

  //Recupera a posição do último filme
  const lastMovie = movies[movies.length - 1];

  //Verifica se há filme, se sim, recebe o id do ultimo filme +1 e atribui como o id do novo filme e coloca-o na lista movies, se não há filme, ele recebe o id 1, pois será o primeiro da lista
  if (movies.length) {
    movie.id = lastMovie.id + 1;
    movies.push(movie);
  } else {
    movie.id = 1;
    movies.push(movie);
  }

  // Mostra o id e o nome do filme adicionado
  res.send(
    `Filme adicionado com sucesso!\nNome do novo filme: ${movie.name}\nID: ${movie.id}`
  );
});

//Rota Atualiza e/ou Edita movie
app.put("/movies/:id", (req, res) => {
  const id = +req.params.id; // converte o id q chega por parâmetro para o tipo inteiro

  //Chama a função q passa o id do objeto procurado por parâmetro. A função valida as posições, procura o id entre as posições não nullas do Array, se achar, guarda e retorna o Índice do objeto encontrado.
  const movieIndex = getIndexByMovie(id);

  if (movieIndex < 0) {
    res.status(404).send({
      message: "O filme não foi encontrado, tente novamente.",
    });
    return;
  }

  const newMovie = req.body;

  //Verifica se as chaves do json NÃO estão com valores para serem passados.
  if (!Object.keys(newMovie).length) {
    res.status(400).send({
      message: "O body esta vazio!",
    });
    return;
  }

  //Verifica se o filme e as posições requisitadas no body são vazias ou não.
  if (!newMovie || !newMovie.name || !newMovie.imageUrl) {
    res.status(400).send({
      message: "Filme invalido, tente novamente.",
    });
    return;
  }

  //Chama a função que irá validar as posições e procurar o filme com base no id passado por parâmeto, retornando o obj.
  const movie = getMoviesById(id);

  //Aquiu o índice é retornado pela função getIndexByMovie(id)e  é usado para fazer a troca dos filmes
  movies[movieIndex] = {
    ...movie,
    ...newMovie,
  };

  res.send(movies[movieIndex]);
});

//Rota Deletar movie
app.delete("/movies/:id", (req, res) => {
  const id = +req.params.id;

  const movieIndex = getIndexByMovie(id); //Função já explicada na rota anterior. Retorna o índice do elemento encontrado, se encontrar.

  if (movieIndex < 0) {
    res.status(404).send({
      message: "Filme não encontrado, ....",
    });
    return;
  }

  //Guardo o objeto de forma temporária apenas para mostrar ao usuário o filme que foi deletado.
  const movieDeleted = movies[movieIndex];

  //Remove 1 movie pelo índice encontrado pela função getIndexBymovie(id) no início do da rota.
  movies.splice(movieIndex, 1);
  res.send({
    message: `Filme ${movieDeleted.name} removido com sucesso`,
  });
});

// Mostra que o host está rodando na porta 3000
app.listen(port, function () {
  console.log(`App rodando na porta http://localhost:${port}/`);
});
