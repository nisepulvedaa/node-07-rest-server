const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
require('./config/config');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//habilitar carpeta public 
app.use(express.static(path.resolve(__dirname, '../public')));

//Configuración 
app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, resp) => {

    if (err) throw err;
    console.log('base de datos Online');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el Puerto:', process.env.PORT);
});