const http = require('http')
const moment = require('moment')

const hostname = '127.0.0.1'
const port = 3000

const array=['Bufalo','Conejo','Dragon','Serpiente','Caballo','Cabra','Gallo','Mono','Elefante','Rata','Tigre','Perro','Jabali']

const server = http.createServer((req, res) => { // request, response
  const ahora = moment().locale('es').format('dddd')
  const animal = array[Math.floor(Math.random()*array.length)]

  res.statusCode = 200 // todo ok
  //res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Content-Type', 'text/html')
  //res.end(`${animal}\n ${ahora}`) // todo bien
  res.end(`<h1>${animal}</h1> ${ahora}`) // todo bien
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})