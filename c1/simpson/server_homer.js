const http = require('http') // *
const fs = require('fs').promises

const hostname = '127.0.0.1'
const port = 3000 // *
// no usar 80 ya q es por default

//scope
let frases // declaramos global para usarla en otras funciones

async function init() {
  frases = await fs.readFile('frases.txt', 'utf8') // datos
  frases = frases.split('\r\n') // trans en string
}
init()
/* 
// se crea afuera para no sobrecargar el servidor
(async()=> {
  const contenido = await fs.readFile('frases.txt', 'utf8')
  myArray = contenido.split("\r\n") // salto de linea
})()
*/

// pasar las respuestas al servidor
const server = http.createServer( (req, res) => { // *
  const pos_azar = Math.floor(Math.random() * frases.length) // es muy usado
  const frase_azar = frases[pos_azar]

  res.statusCode = 200 // todo ok
  res.setHeader('Content-Type', 'text/html;charset=UTF-8')
  res.end(`<h1>${frase_azar}</h1>`) // *
})

server.listen(port, hostname, () => { // *
  console.log(`Server running at http://${hostname}:${port}/`)
})