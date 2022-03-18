const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const { getCursos, nuevoCurso } = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static('static'));
app.use(express.static('node_modules/bootstrap/dist'));

nunjucks.configure('views', { express: app, autoescape: true, watch: true });

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/curso', async (req, res) => {
  try {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    console.log(nombre, nivelTecnico, fechaInicio, duracion);
    console.log('aqui');
  } catch (error) {
    res.send(error);
  }
});

app.get('/cursos', async (req, res) => {
  try {
    const cursos = await getCursos();
    res.send({ cursos });
  } catch (error) {
    res.send(error);
  }
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
