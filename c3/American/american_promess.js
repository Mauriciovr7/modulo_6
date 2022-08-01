const express = require('express')
const fs = require('fs').promises
const app = express()
const moment = require('moment')

let nombreArchivo

app.use(express.static('public')) // statics arch
// app.get(RUTA, FUNCION_RESPUESTA)

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

// ruta
app.post('/crear', (req, res) => {
  // típica estructura para obtener datos de un POST
  let str = ''
  req.on('data', function (parte) {
    str += parte;
  })
  req.on('end', function () {
    const form = JSON.parse(str)
    console.log(form.pizza);
    res.json({todo: 'ok'}) // json en vez de send(el send manda texto y json objeto)
  })
})