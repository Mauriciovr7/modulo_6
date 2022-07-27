const axios = require('axios')
const fs = require('fs')

const nombre_text = process.argv[2] //nombre de archivo
const nombre_ext = process.argv[3] //nombre de extension 
const tipo_indicador = process.argv[4] //tipo de cambio
const cantidad = process.argv[5] // cantidad a transformar

let total

if(nombre_text == undefined ||
  nombre_ext == undefined ||
  tipo_indicador == undefined ||
  cantidad == undefined){
    console.log('ingresar consulta completa')
    process.exit(1)
}

async function getDatos(nombre_text, nombre_ext, tipo_indicador, cantidad){
  console.log('conectando api...')
  // obtener datos de api
  
  try {
    const res = await axios.get ('https://mindicador.cl/api') // error 502 (servidor)
    const hoy = new Date()
    
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
  //const dolarActual = res.data.dolar.valor  
  //const cantidad = 250000
  const tipo_valor = res.data[tipo_indicador].valor
  //console.log(tipo_valor) // 941.03
  
  if(tipo_indicador == 'bitcoin'){
    //const resultado = (cantidad*tipo_valor)*res.data.dolar.valor
    total = ((cantidad / res.data.dolar.valor)/tipo_valor).toFixed(2)
  } else {total = (cantidad / tipo_valor).toFixed(2)}
  
  
  //console.log('total' + total)

  const frase = `A la fecha: ${hoy} fue realizada cotización con los siguientes
  datos:
  Cantidad de pesos a convertir: $${cantidad} pesos
  Convertido a ${tipo_indicador} da un total de:
  ${total}.-`

  function escribir(frase){
    fs.writeFile(`${nombre_text}.${nombre_ext}`, frase,'utf-8', function(){
      setTimeout(()=> { leer()}, 5000)
    })
  }
  function leer(){
    fs.readFile(`${nombre_text}.${nombre_ext}`, 'utf-8', function(err, contenido){
      console.log(contenido)  // tipo return     
    })
  }
  //console.log('dolar ', res.data.dolar.valor)
  //console.log(frase);
  escribir(frase)
}
getDatos(nombre_text, nombre_ext, tipo_indicador, cantidad);