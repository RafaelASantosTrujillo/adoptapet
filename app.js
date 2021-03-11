// Importamos las bibliotecas necesarias
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// Objeto global de la app
var app = express();

// configuración de middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*********************** Mongoose Configuration *******************************/
const mongoose = require("mongoose");
var isProduction = process.env.NODE_ENV === 'production';
mongoose.connect(
  process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
// var isProduction = process.env.NODE_ENV === 'production';
// mongoose.connect(
//     "mongodb+srv://RafaelSantos:Santos27..@cluster0.wkdca.mongodb.net/adoptapet?retryWrites=true&w=majority"
// );

mongoose.set("debug", true);

require("./models/Usuario");
require('./config/passport');
// Aquí se importarán los modelos Mascota y Solicitud cuando estén listos
require("./models/Mascota");
require("./models/Solicitud");

/*********************** Mongoose Configuration *******************************/

// Agregamos el código de nuestro router (routes/index.js)
app.use('/v1', require('./routes'));

// Manejando los errores 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Iniciando el servidor...
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Escuchando en el puerto ' + server.address().port);
});