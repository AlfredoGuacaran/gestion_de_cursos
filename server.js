const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static('static'));
app.use(express.static('node_modules/bootstrap/dist'));

nunjucks.configure('views', { express: app, autoescape: true, watch: true });

app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
