// backEnd
const express = require('express')
const app = express()
const Jimp = require('jimp') // manipular imagen

app.use(express.static('public'))

const hostname = '127.0.0.1'
const port = 3000

app.get('/crear', async (req, res) => {
  const imagen = await Jimp.read(req.query.url_image)

  imagen.greyscale()
  .quality(60) // set JPEG quality
  .resize(350, 350) // resize
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

app.listen(3000, function () {
  console.log(`server running http://${hostname}:${port}/`)
})
