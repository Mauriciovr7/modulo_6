const child_process = require('child_process')
const fs = require('fs')

// captura y almacena en vars
const nombre_text = process.argv[2] //nombre de archivo
const nombre_ext = process.argv[3] //nombre de extension 
const tipo_indicador = process.argv[4] //tipo de cambio
const cantidad = process.argv[5] // cantidad a transformar

//let total
// primero chequeo que el usuario mandó info requerida
if(nombre_text == undefined ||
  nombre_ext == undefined ||
  tipo_indicador == undefined ||
  !cantidad){ //  == undefined
    console.log('ingresar consulta completa')
    process.exit(1) // (1) si terminó con errores
}
// sin callbacks
// exec = ejecuta archivo externo (mostrar en console.log)
child_process.exec(`node todo_cambio.js ${nombre_text} ${nombre_ext} ${tipo_indicador} ${cantidad}`, function(err, datos) { //+' '+arch+'.'+txt+' '+tipo+' '+cant
  console.log(datos)
})

/* function ejecutar (consulta) { // universal arch,txt,tipo,cant todo_cambio.js dato txt dolar 2300
  return new Promise ((resolve, reject) => {
    child_process.exec('node '+consulta, function(err, res) { //+' '+arch+'.'+txt+' '+tipo+' '+cant
      if (err) {
        return reject(err)
      }
      resolve(res)
    })
  })
}
//ejecutar(nombre_text,nombre_ext,tipo_indicador,cantidad)
(async function() {
  await ejecutar(`todo_cambio.js ${nombre_text} ${nombre_ext} ${tipo_indicador} ${cantidad}`) //nombre_text,nombre_ext,tipo_indicador,cantidad
  function leer(){
    fs.readFile(`${nombre_text}.${nombre_ext}`, 'utf-8', function(err, contenido){
      console.log(contenido)       
    })
  }
  leer()
})() */ // () para invocar a IIFE

// node externo.js dato txt euro 23000000