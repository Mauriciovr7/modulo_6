const child_process = require('child_process')

//child_process.exec(comando, callback)
child_process.exec('node inicial.js', function(err, res1) { // proceso 1
  const precio = Number(res1) // se parsea

  child_process.exec('node descuento.js', function(err2, res2) { // proceso 2
    const descuento = Number(res2)

    const precio_final = precio - (precio*descuento/100)

  console.log(`final es: ${precio_final}`) // 

  })
})