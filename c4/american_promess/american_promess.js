// backEnd
// metodo POST
const express = require('express')
const fs = require('fs').promises
const app = express()
const moment = require('moment')

const hostname = '127.0.0.1'
const port = 3000

app.use(express.static('public'))
app.use(express.json())
// app.use(express.urlencoded()) // deprecado
app.use(express.urlencoded({extended:true})) 

/* 
function getForm(req) {
  return new Promise((res, rej) => {
    let str = ''
    req.on('data', function (chunk) {
      str += chunk
    })
    req.on('end', function () {
      console.log('str', str);
      const obj = JSON.parse(str)
      res(obj)
    })
  })
}
 */

// CREAR getForm
// metodo get , inseguro para enviar datos, yaq se ven en la barra direccion del navegador, poco contenido(2048 caracteres), solo ASCII
// metodo post, mas seguro, yaq datos se envian por debajo, no estan expuestos, contenido ilimitado, ASCII y binarios
app.post('/crear', (req, res) => {
// app.post('/crear', async (req, res) => {
  // const form = await getForm(req) // = reemplaza el json.parse linea 23
  const hoy = moment(new Date()).format('DD/MM/YYYY')

  let str = ''
  req.on('data', (parte) => str += parte)
  req.on('end', () => {
    const form = JSON.parse(str)
    // console.log(form.nombre_crea)

    const info = `${hoy}\n${form.contenido}`

    // await fs.writeFile(`archivos/${form.nombre_crea}.txt`, info, 'utf-8', () => {
    fs.writeFile(`archivos/${form.nombre_crea}.txt`, info, 'utf-8', () => {
      //setTimeout(()=> { leer()}, 3000)
    })

    res.json({ todo: 'ok' })
  })
})

// LEER
app.post('/leer', (req, res) => {
  // console.log('leer')

  let str = ''
  req.on('data', (parte) => str += parte)
  req.on('end', () => {
    const form = JSON.parse(str)

    let myArray

    (async () => {
      try {

        const contenido = await fs.readFile(`archivos/${form.nombre_arch}.txt`, 'utf8')
        myArray = contenido.split("\n").join('<br>')

        res.json(myArray)

      } catch (error) {
        console.log('Archivo no existe')
        res.json({ error })
      }
    })()
  })
})

// renombrar
app.post('/renombrar', (req, res) => {
  // console.log('renombrar')

  let str = ''
  req.on('data', (parte) => str += parte)
  req.on('end', () => {
    const form = JSON.parse(str)

    let myArray

    (async () => {
      try {

        await fs.rename(`archivos/${form.nombre_anterior}.txt`, `archivos/${form.nuevo_nombre}.txt`)

        res.json({ renombrado: 'ok' })

      } catch (error) {
        console.log('Archivo no existe')
        res.json({ error })
      }
    })()
  })
})

// eliminar
app.post('/eliminar', (req, res) => {
  // console.log('eliminar')

  let str = ''
  req.on('data', (parte) => str += parte)
  req.on('end', () => {
    const form = JSON.parse(str)

    let myArray

    (async () => {
      try {

        await fs.unlink(`archivos/${form.arch_eliminar}.txt`, (err) => {
          //setTimeout(()=> { leer()}, 3000)
        })

        res.json({ eliminado: 'ok' })

      } catch (error) {
        console.log('Archivo no existe')
        res.json({ error })
      }
    })()
  })
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

// nodemon american_promess
