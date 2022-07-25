const fs = require('fs').promises

async function escribir() {
  let items = ['Manzanas', 'Aceite', 'Café', 'Chocolate']
  items = items.join('\n')
  // fs.writeFile(nombre_archivo, contenido, codificacion, callback)

  await fs.writeFile('market.txt', items, 'utf8')

  const contenido = await fs.readFile('market.txt', 'utf8')
  console.log(contenido)

  await fs.rename('market.txt', 'compras.txt')
  await fs.unlink('compras.txt')
}
escribir()