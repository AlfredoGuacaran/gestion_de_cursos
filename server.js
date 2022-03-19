const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const { getCursos, nuevoCurso, borrarCurso, editarCurso } = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static('static'));
app.use(express.static('node_modules/bootstrap/dist'));

nunjucks.configure('views', { express: app, autoescape: true, watch: true });

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/curso', async (req, res) => {
  try {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    if (!(nombre && nivelTecnico && fechaInicio && duracion)) return;

    const post = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion);
    console.log(post);
  } catch (error) {
    console.log(res);
  }
});

app.get('/cursos', async (req, res) => {
  try {
    const cursos = await getCursos();
    res.send(cursos);
  } catch (error) {
    console.log(error);
  }
});

app.delete('/curso/:numeroCurso', async (req, res) => {
  try {
    const { numeroCurso } = req.params;

    const borrar = await borrarCurso(+numeroCurso);
    res.end(borrar);
  } catch (error) {
    console.log(error);
  }
});

app.put('/curso', async (req, res) => {
  try {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;

    if (!(id && nombre && nivelTecnico && fechaInicio && duracion)) return;

    const put = await editarCurso(
      id,
      nombre,
      nivelTecnico,
      fechaInicio,
      duracion
    );
    res.send(put);
  } catch (error) {
    console.log(res);
  }
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
