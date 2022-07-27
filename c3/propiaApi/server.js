/* const http = require('http')
const axios = require('axios') */

const app = express()

app.use(express.static('static')) // declara una carpeta (static) para guardar los arch estaticos
// app.get(RUTA, FUNCION_RESPUESTA) // get,post,put,delete

app.get('/', (req, res) => {
  res.send(`
  <html>
    <h2>server caido</h2>
  </html>`)
})

app.get('/api', (req, res) => {
  res.send(`
  <html>
    <h2>api</h2>
  </html>`)
})

app.listen(3000, function(){
  console.log('ejecutando')
})

