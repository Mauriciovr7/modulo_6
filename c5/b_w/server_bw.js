// backEnd
const express = require('express')
const Jimp = require('jimp') // manipular imagen
const yargs = require('yargs') // para capturar los argumentos en la línea de comando.
const chalk = require('chalk')  // chalk @4 ver.4 en colores
const moment = require('moment')  // fecha
const axios = require('axios')  // get api

const app = express()

app.use(express.static('public'))

// const hostname = '127.0.0.1'
const port = 3000

const argv = yargs.command(
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
).help().argv

async function frase() {
  const num = Math.floor(Math.random() * 80) + 1
  const datos = await axios.get(`https://anapioficeandfire.com/api/houses/${num}`)
  const fraseAzar = datos.data.name
  return fraseAzar
}

app.get('/crear', async (req, res) => {
  //console.log(('lat ',req.query.latitude))
  const re =  /^(http[s]?:\/\/){0,1}(w{3,3}\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/ // /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/
  if (!re.test(req.query.url_image)) {
    console.log('url error')
    return
  }

  // console.log('geo  -33, -70') // sacar ubicacion
  const imagen = await Jimp.read(req.query.url_image)
  const fuente = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK) // Open Sans, 8px, black

  console.log(chalk.underline.bold.bgCyan(Math.round(req.query.latitude), ' latitude'))
  console.log(chalk.underline.bold.bgRed(Math.round(req.query.longitude), 'longitude'))


  imagen.greyscale()
    .quality(60) // set JPEG quality
    .resize(350, 350) // resize
    .print(fuente, 8, 10, `${moment(new Date).format('DD/MM/YYYY, h:mm:ss a')}`)
    .print(fuente, 8, 40, `${await frase()}`)
    .write('public/newImg.jpg')
  res.redirect('/newImg.jpg')
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

/* app.listen(port, function () {
  console.log(`server running http://${hostname}:${port}/`)
}) */

// node server_bw.js key --num 123
