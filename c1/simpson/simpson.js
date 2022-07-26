// servidor de simpson

const http = require('http') // *
const fs = require('fs').promises

const hostname = '127.0.0.1'
const port = 3000 // *

let myArray; // global

// se crea afuera para no sobrecargar el servidor
(async()=> {
  const contenido = await fs.readFile('frases.txt', 'utf8')
  myArray = contenido.split("\r\n") // salto de linea
})()

const server = http.createServer(async (req, res) => { // *
  const frase = myArray[Math.floor(Math.random() * myArray.length)]

  res.statusCode = 200 // todo ok
  res.setHeader('Content-Type', 'text/html;charset=UTF-8')
  res.end(`<h1>${frase}</h1>`) // *
})

server.listen(port, hostname, () => { // *
  console.log(`Server running at http://${hostname}:${port}/`)
})