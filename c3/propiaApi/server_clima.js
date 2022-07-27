const http = require('http')
const axios = require('axios')

const hostname = '127.0.0.1'
const port = 5000

// 3 rutas

const server = http.createServer(async (req, res) => { // request , response // consulta , respuesta

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
    /* const resp = await axios.get ('https://api.gael.cloud/general/public/clima')
    const temuco = data.data.find(obj => obj.Estacion == 'Temuco')
    respuesta = JSON.stringify(temuco) || 'no encontrado' */
    const clima = resp.data
    console.log(clima)

    respuesta = JSON.stringify(clima)
  }else {
    respuesta = 'ruta no existe'
  }

  // aca
  /* async function getClima() {
    const resp = await axios.get ('https://api.gael.cloud/general/public/clima/Valdivia')
    const clima = resp.data
    console.log(clima)
  } */
  // getClima()
  
  res.end(respuesta)
})

server.listen(port, hostname, () => {
  console.log(`server running http://${hostname}:${port}/`)
})