// backEnd
const express = require('express')
const app = express()
const Jimp = require('jimp')

app.use(express.static('public'))

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const hostname = '127.0.0.1'
const port = 3000

app.get('/crear', async (req, res) => {
  const imagen = await Jimp.read(req.query.url_image)

  imagen.greyscale()
  .write('public/b_n.jpg')
  res.redirect('/b_n.jpg')
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

app.listen(3000, function () {
  console.log(`server running http://${hostname}:${port}/`)
})


// nodemon server_bw
