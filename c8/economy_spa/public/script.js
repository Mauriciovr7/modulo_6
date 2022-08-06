async function cargar_mails () {
  // 1. Le pedimos los usuarios a nuestra API
  let resp = await fetch('/mails')
  resp = await resp.json()

  // 2. armamos el texto de la UL
  let texto_ul = ''
  for (let mail of resp.mails) {
    texto_ul += `<li class="list-group-item list-group-item-info w-25">${mail.email}</li>`
  }

  // 3. agregamos ese texto al DOM
  document.querySelector('#mails').innerHTML = texto_ul // con js

  console.log(resp);
}
cargar_mails() // arranca