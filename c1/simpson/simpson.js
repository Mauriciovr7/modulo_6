const http = require('http') // *
const fs = require('fs').promises

const hostname = '127.0.0.1'
const port = 3000 // *

const server = http.createServer(async function (req, res)  { // *
    const contenido = await fs.readFile('frases.txt', 'utf8')
    const myArray = contenido.split("\r\n")
    let frase = myArray[Math.floor(Math.random() * myArray.length)]

    res.statusCode = 200 // todo ok
    res.setHeader('Content-Type', 'text/html')
    res.end(`<h1>${frase}</h1>`) // *
})

server.listen(port, hostname, () => { // *
  console.log(`Server running at http://${hostname}:${port}/`)
})