const express = require('express')
const moment = require('moment')
const uuid = require('uuid')
const axios = require('axios')
const chalk = require('chalk')

const app = express()
const port = 3000
const users = []

app.use(express.static('public'))

/* const argv = yargs.command(
  'key', // propiedades
  'Comando clave para levantar servidor',
  {
    num: {
      describe: 'clave',
      demand: false,
      alias: 'n'
    }
  },
  function (argumentos) {
    if (argumentos.num == 123) {

      app.listen(port, function () {
        console.log(`server running http://localhost:${port}/`)
      })

    } else { console.log('Clave incorrecta') }
  }
).help().argv */

// nuestra api
app.get('/users', (req, res) => {

  for (let user of users) {
    console.log(chalk.underline.bold.bgWhite.blue(`id: ${user.id}\n Nombre: ${user.nombre}\n Email: ${user.email}\n Fecha de registro: ${user.timestamp}\n`));
  }

  res.json({ users })
})

app.get('/new-user', async (req, res) => {
  const datos = await axios.get('https://randomuser.me/api')
  const random_user = datos.data.results[0]
  const timestamp = moment(new Date).format('DD/MM/YYYY, h:mm:ss a')
  const user = {
    id: uuid.v4(), // id único
    nombre: `${random_user.name.first} ${random_user.name.last}`,
    email: random_user.email,
    timestamp
  }
  users.push(user) // agregar a lista usuarios
  res.redirect('/') // usuario creado
})

// inexistente
app.get('*', (req, res) => { // ruta no existe
  res.send(`
  <html>
    <h2>...ruta no existe</h2>
    <a href="/">
      <button>Volver</button>
    </a>
  </html>`)
})

app.listen(port, function () {
  console.log(`server running http://localhost:${port}/`)
})

// nodemon server
