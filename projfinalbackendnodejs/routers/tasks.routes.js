const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');

// Rota inicial
router.get('/', async (req, res) => {
    // console.log("Tudo certo por aqui")
  await Task.find({})
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((err) => {
      res.status(400).send("Ops! Algo deu errado");
      console.log(err);
    });
});

// Busca tarefas por ID
router.get('/findById/:id', async (req, res) => {
  await Task.find({_id: req.params.id})
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((err) => {
      res.status(400).send("Tarefa não encontrada");
      console.log(err);
    });
});

// Rota adiciona
router.post('/add', async (req, res) => {
  await Task.create(req.body)
    .then(() => {
      res.status(200).send("A tarefa foi criada");
    })
    .catch((err) => {
      res.status(400).send("Ops! Algo deu errado.");
      console.error(err);
    });
});

// Atualiza tarefas
router.put('/update/:id', async (req, res) => {
  await Task.updateOne({_id: req.params.id}, req.body)
    .then(() => {
      res.status(200).send("Atualizado com sucesso");
    })
    .catch((err) => {
      res.status(400).send("Ops! Algo deu errado");
      console.log(err);
    });
});

// Deleta tarefas
router.delete('/delete/:id', async (req, res) => {
  await Task.deleteOne({_id: req.params.id});
  then(() => {
    res.status(200).send("Tarefa deletada");
  }).catch((err) => {
    res.status(400).send("Algo deu errado. A tarefa não foi deletada.");
    console.log(err);
  });
});

module.exports = router;
