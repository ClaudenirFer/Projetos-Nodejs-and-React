const express = require('express');
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/tasks');


// Rota inicial
router.get('/', async (req, res) => {
    
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

  const Id = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(Id)) {
    res.status(422).send("ID Inválido");
    return;
  }

  await Task.findOne({_id: req.params.id})
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((err) => {
      res.status(400).send("Tarefa não encontrada. Id inválido.");
      console.log(err);
    });
});

// Rota adiciona
router.post('/add', async (req, res) => {

  const task = req.body;
  
  if (task.task == undefined || task.description == undefined || task.priorities == undefined || task.taskStaus == undefined || task.deadline == undefined ) {
    res.status(400).send({message: 'Erro! Campo requerido não pode ser vazio.'});
    return;
  }
  console.log(task)
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

  const task = req.body;
  
  if (task.task == undefined || task.description == undefined || task.priorities == undefined || task.taskStaus == undefined || task.deadline == undefined ) {
    res.status(400).send({message: 'Erro! Campo requerido não pode ser vazio.'});
    return;
  }

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
