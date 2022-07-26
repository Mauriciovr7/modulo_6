//console.log('pronos Temuco 13º')
//console.log(process.argv)

const axios = require('axios')
const nombre_estacion = process.argv[3] // Temuco
//console.log(nombre_estacion)

if(nombre_estacion == undefined) { // si no tiene nombre
  console.log('especificar nombre ')
  process.exit(1) // salir de node
}

async function getClima(nombre_estacion) {
  console.log(`estacion ${nombre_estacion}`)
  // obtener datos
  const resp = await axios.get('https://api.gael.cloud/general/public/clima')
  const estaciones = resp.data
  // buscar estacion
  const estacion = estaciones.find(est => est.Estacion == nombre_estacion)
  // no existe
  if(estacion == undefined) {
    console.log('no existe ')
    process.exit(1)
  }
  // mostar datos
  //console.log(estaciones)
  console.log``(`temperatura de: ${nombre_estacion} es ${estacion.Temp}ºC y humedad ${estacion_Humedad}` )
}
getClima(nombre_estacion) // Temuco