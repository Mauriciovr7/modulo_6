const child_process = require('child_process')
// sin callbacks
function ejecutar (nombre_arch) { // universal
  return new Promise ((resolve, reject) => {
    child_process.exec('node '+nombre_arch, function(err, res) {
      if (err) {
        return reject(err)
      }
      resolve(res)
    })
  })
}

(async function() {
  const distancia = parseInt(await ejecutar('kilometros.js'))
  const consumo = parseInt(await ejecutar('consumo.js'))
  const precio_benc = parseInt(await ejecutar('bencina.js'))

  console.log(distancia)
  console.log(`gasto final es:$ ${(distancia/consumo)*precio_benc}`) // 
})() // () para invocar a IIFE