const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

// 3 rutas

const server = http.createServer(async (req, res) => { // request , response // consulta , respuesta

  console.log(req.url)

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/', 'text/html')

  let respuesta

  if (req.url == '/') {
    const pagina = `
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
  } else {
    respuesta = 'ruta no existe'
  }

  // aca
  
  res.end(respuesta)
})

server.listen(port, hostname, () => {
  console.log('server running http://${hostname}:${port}/')
})