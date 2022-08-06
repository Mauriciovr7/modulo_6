const express = require('express')
const axios = require('axios')
const uuid = require('uuid')
const fs = require('fs').promises
const clave = require('./clave.js').clave
const em = require('./clave.js').em // modificar

const app = express()

const nodemailer = require('nodemailer')

let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: em, //'mbensan.test@gmail.com',
    pass: clave
  }
})

// para usar archivos estáticos
app.use(express.static('public'))

// post
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

const nuevo_email = async function (new_email) {
  // 1. Leemos el contenido del archivo 'db.json'
  let archivo_db = await fs.readFile('db.json', 'utf8')
  // 2. Transformamos su contenido (string) a un objeto de JS
  archivo_db = JSON.parse(archivo_db)
  // 3. Le agregamos el nuevo usuario al array 'users
  archivo_db.mails.push(new_email)
  // 4. Volvemos a transformar el contenido a String
  archivo_db = JSON.stringify(archivo_db)
  // 5. Sobreescribimos el contenido del archivo 'db.json'
  await fs.writeFile('db.json', archivo_db, 'utf8')
}
const leer_mails = async function () {
  // 1.// 1. Leemos el contenido del archivo 'db.json'
  let archivo_db = await fs.readFile('db.json', 'utf8')
  // 2. Transformamos su contenido (string) a un objeto de JS
  archivo_db = JSON.parse(archivo_db)
  // 3. Retornar la propiedad 'users' del archivo leído
  return archivo_db.mails
}

app.get('/mails', async (req, res) => {//
  const mails = await leer_mails()//
  res.json({ mails })//
})//

app.get('/mailing', async (req, res) => { // async (req, res) => {
  try {

    const resp = await axios.get('https://mindicador.cl/api')
    const indicadores = resp.data//[0] dólar, euro, uf y utm., no usar yen xD
    const dolar = indicadores.dolar.valor
    const euro = indicadores.euro.valor
    const uf = indicadores.uf.valor
    const utm = indicadores.utm.valor

    // 2. Generamos el ID único
    const id_unico = uuid.v4()

    // 4. creamos el nuevo usuario
    const new_email = {
      email: req.query.correos,
      asunto: req.query.asunto,
      contenido: `${req.query.contenido} <p>Valor dolar de hoy es: _$ ${dolar}</p> <p>Valor Euro de hoy es: _$ ${euro}</p> <p>Valor UF de hoy es: _$ ${uf}</p> <p>Valor UTM de hoy es: _$ ${utm}</p>`,
      id: id_unico
    }

    // enviar
    // const receivers = 'mbensan@outlook.com'
    console.log(new_email.email, new_email.asunto, new_email.contenido)
    //enviar(new_email.email, new_email.asunto, new_email.contenido) // forma 1

    await transport.sendMail({
      from: `"Mauro" <${em}>`, // sender address
      to: new_email.email, // list of receivers
      subject: new_email.asunto, // Subject line
      html: new_email.contenido, // html body
    })
    
    // 5. guardamos al usuario en la base de datos
    await nuevo_email(new_email)

    res.redirect('/') // ir a index

  } catch (error) {
    console.error(error)
  }

})

//inexistente
app.get('*', (req, res) => {
  res.send('Página aún no implementada')
})

app.listen(3000, function () {
  console.log('servidor ejecutando correctamente');
})

<<<<<<< HEAD
// ***************** email

function enviar(receivers, asunto, mensaje) {
  console.log('enviando email ', receivers, asunto, mensaje)
  let info = transport.sendMail({
    from: `"Mauro" <${em}>`, // sender address
    to: "stb539@gmail.com", // list of receivers
=======
/* function enviar(receivers, asunto, mensaje) {
  console.log('enviando email ', receivers, asunto, mensaje)
  let info = transport.sendMail({
    from: `"Mauro" <${em}>`, // sender address
    to: "mbensan@outlook.com", 'mbensan.test@gmail.com' // list of receivers
>>>>>>> e99b914 (m6 c9_emailer)
    subject: "Hello ✔", // Subject line
    text: "Hola Mundo!", // plain text body
    html: "<b>Hello world?</b>", // html body
  })
  console.log(info)
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
  /* const options = {
    from: em,
    to: receivers,
    subject: asunto,
    html: mensaje
  } */
}
  /*
  transport.verify().then(() => {
    console.log('Ready')
  })

  transport.sendMail(options, function (err, info) {
    console.log('send')
    if (err) {
      console.log('enviading');
      console.log('error', err);
    } else {
      console.log(info);
    }
  })
} */

// nodemon server

/* 
BONUS para tarea: Spam Esconomic SPA
- Listar los correos enviados en una tabla, en la página principal
- Eliminar correos creados de la base de datos (o de la carpeta correos)
 */