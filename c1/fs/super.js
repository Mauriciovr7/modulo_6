const fs = require('fs')

function escribir() {
  const lista_productos = `Harina\nArroz\nCereal\nPan\nJugos\nGalletas\nFrutas`
  // fs.writeFile(nombre_archivo, contenido, codificacion, callback)

  fs.writeFile('minimarket.txt', lista_productos, 'utf8', function () {
    console.log('Archivo escrito correctamente')
    setTimeout(() => {leer()}, 2000)
  })    
}
escribir()

function leer() {
  fs.readFile('minimarket.txt', 'utf8', function (err, datos) {
    console.log(datos)
    setTimeout(() => {renombrar()}, 2000)
  })
  console.log('Terminando ejecución')
}

function renombrar() {
  fs.rename('minimarket.txt', 'shopping.txt', function () {
    const del = setTimeout(eliminar, 2000)
    console.log('Archivo renombrado')
  })
}

function eliminar() {
  fs.unlink('shopping.txt', function () {
    console.log('Archivo eliminado')
  })
}