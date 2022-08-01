// metodo GET
const express = require('express')
const fs = require('fs')
const app = express()
//const moment = require('moment')

const hostname = '127.0.0.1'
const port = 5000

let nombreArchivo

app.use(express.static('public')) // declara una carpeta (static) para guardar los arch estaticos
// app.get(RUTA, FUNCION_RESPUESTA) // get,post,put,delete

app.get('/crear', (req, res) => {

  // const info = `${moment().locale('es').format('dd/mm/yyyy')}\n${req.query.contenido}`
  const hoy = new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()
  const info = `${hoy}\n${req.query.contenido}`

  // usar moment

  fs.writeFile(`archivos/${req.query.nombre}.txt`, info, 'utf-8', function () {
  //fs.writeFile(`${'archivos/' + req.query.nombre}.txt`, info, 'utf-8', function () {
    //setTimeout(()=> { leer()}, 5000)
  })
  res.send(`
  <html>
    <h2>Archivo creado exitosamente</h2>
    <a class="nav-link" href="/">
      <button class="btn btn-outline-success">Volver</button>
    </a>
  </html>`)
})


app.get('/leer', (req, res) => {
  
  fs.readFile(`archivos/${req.query.nombre_arch}.txt`, 'utf-8', function (err, contenido) {
    // split y join
    if (err) {
      res.send(`
      <html>
        <h4>Archivo: ${req.query.nombre_arch} no encontrado</h4>
        <a class="nav-link" href="/">
          <button class="btn btn-warning">Volver</button>
        </a>
      </html>
      `)
    } else {
      const myArray = contenido.split("\n").join('<br>')
      res.send(`
      <html>
        <h2>Leyendo exitosamente</h2>
        <h4>Contenido del archivo: "${req.query.nombre_arch}.txt"</h4>
        <h3>${myArray}</h3>
        <a class="nav-link" href="/">
          <button class="btn btn-warning">Volver</button>
        </a>
      </html>
    `)
    }
  })
})

app.get('/renombrar', (req, res) => {

  fs.rename(`archivos/${req.query.nombre_anterior}.txt`, `archivos/${req.query.nuevo_nombre}.txt`, function () {
    //setTimeout(()=> { leer()}, 5000)
  })

  res.send(`
  <html>
    <h2>se renombra el archivo ${req.query.nombre_anterior} a ${req.query.nuevo_nombre}, exitosamente</h2>
    <a class="nav-link" href="/">
      <button class="btn btn-outline-success">Volver</button>
    </a>
  </html>`)
})

  app.get('/eliminar', (req, res) => {

    nombreArchivo = req.query.arch_eliminar

  fs.unlink(`archivos/${req.query.arch_eliminar}.txt`, function (err) {

    if (err) {
      res.send(`
      <html>
        <h4>Archivo: ${req.query.arch_eliminar} no encontrado</h4>
        <a class="nav-link" href="/">
          <button class="btn btn-warning">Volver</button>
        </a>
      </html>
      `)
      return
    }

    // pag intermedia
      res.send(`
        <h2>Tu solicitud para eliminar el archivo
          ${req.query.arch_eliminar} se está procesando...
        </h2>
        <script>
          setTimeout(()=> { mensaje()}, 3000)
          function mensaje() {
            window.location = '/confirmar_eliminado?nombre=${nombreArchivo}'
          }
        </script>
      `)    

    /* res.send(`
      <html>
        <h2>Tu solicitud para eliminar el archivo
          ${req.query.arch_eliminar} se está procesando
        </h2>
        <script>
        setTimeout(()=> { mensaje()}, 3000)
        function mensaje() {
          const msj = document.querySelector('h2')
          msj.innerHTML = 'Archivo ${req.query.arch_eliminar} eliminado exitosamente'
        }        
        </script>
        <a class="nav-link" href="/">
          <button class="btn btn-outline-success">Volver</button>
        </a>
      </html>
    `) */
  })

})

app.get('/confirmar_eliminado', (req, res) => {
  res.send(`
    <html>
      <h2>Archivo ${nombreArchivo} eliminado exitosamente</h2>
      <a class="nav-link" href="/">
        <button class="btn btn-outline-success">Volver</button>
      </a>
    </html>
  `)

})

app.get('*', (req, res) => { // ruta no existe
  res.send(`
  <html>
    <h2>...ruta no existe</h2>
    <a class="nav-link" href="/">
      <button class="btn btn-outline-success">Volver</button>
    </a>
  </html>`)
})

app.listen(port, function () {
  console.log(`server running http://${hostname}:${port}/`)
})

// node american_connection

// nodemon american_connection
