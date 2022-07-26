// cuantos litros gastaré y por tanto

const child_process = require('child_process')

//child_process.exec(comando, callback)
child_process.exec('node kilometros.js', function(err, res1) { // proceso 1
  const km = Number(res1) // se parsea Number = parseInt
  //console.log(km)

  child_process.exec('node consumo.js', function(err2, res2) { // proceso 2 (callback)
    const consumo = Number(res2)

    //const gasto_final = (km / consumo) * 1200 // km - (km*consumo/100)

  //console.log(`gasto final es:$ ${gasto_final}`) // 

  child_process.exec('node bencina.js', function(err, res3) { // otro callback
    const bencina = parseInt(res3)

    const gasto_final = (km / consumo) * bencina // km - (km*consumo/100)
    console.log(`gasto final es:$ ${gasto_final}`) // 
  } )

  })
})

