const express = require('express')
//const axios = require('axios')
const app = express()

app.use(express.static('public')) // declara una carpeta (static) para guardar los arch estaticos
// app.get(RUTA, FUNCION_RESPUESTA) // get,post,put,delete

app.get('/crear', (req, res) => {
  res.send(`
  todo ok`)
})


/* app.get('/', (req, res) => {
  res.send(`
  <html>
    <h2>server caido</h2>
  </html>`)
})

app.get('/api', (req, res) => {
  res.send(`
  <html>
    <h2>server caido</h2>
  </html>`)
})

app.get('*', (req, res) => { // ruta no existe
  res.send(`
  <html>
    <h2>ruta no existe</h2>
  </html>`)
}) */

app.listen(5000, function(){
  console.log('ejecutando')
})

// 3 rutas

/* const server = http.createServer(async (req, res) => { // request , response // consulta , respuesta

  console.log(req.url)

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/', 'text/html')

  let respuesta

  if (req.url == '/') {
    respuesta = `
    <html>
      <h2>server caido</h2>
    </html>`
  } else if (req.url == '/api') {
    respuesta = {
      fecha: new Date(),
      dolar: {
        indicador: 'Dolar EEUU',
        valor: 950
      },
      uf: {
        indicador: 'Unidad de Fomento',
        valor: 33450
      }
    }
    respuesta = JSON.stringify(respuesta)

  } else if (req.url == '/api/dolar') {
    respuesta = {
      hoy: 950,
      ayer: 1000,
      anteayer: 'muy caro' 
      }
    respuesta = JSON.stringify(respuesta)
  } else if  (req.url == '/api/clima') {
    const resp = await axios.get ('https://api.gael.cloud/general/public/clima/SCVD')
    const clima = resp.data
    console.log(clima)

    respuesta = JSON.stringify(clima)
  }else {
    respuesta = 'ruta no existe'
  }  
  res.end(respuesta)
})

server.listen(port, hostname, () => {
  console.log(`server running http://${hostname}:${port}/`)
}) */