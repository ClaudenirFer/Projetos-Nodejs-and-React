if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require("cors");

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const Conn = require('./models/conn/conn');

const db_url = process.env.DB_URL;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_database = process.env.DB_DATABASE;

Conn(db_url, db_user, db_pass, db_database);
const port = 3001;

const tasksRouter = require('./routers/tasks.routes');
app.use('/tasks', tasksRouter);

app.listen(process.env.PORT || port, () => {
  console.info(`servidor rodando na porta ${port}`);
});
