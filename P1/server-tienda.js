//-- Importo los módulos http,url y fs
const http = require('http');
const url = require('url');
const fs = require('fs');

//-- Definir el puerto a utilizar
const PUERTO = 9000;

//-- Crear el servidor
const server = http.createServer((req, res) => {

  const objetourl = url.parse(req.url);
  let camino=''+objetourl.pathname;
  console.log('Holaaaaaaaaaa',camino);

  //-- Indicamos que se ha recibido una petición
  console.log("Petición recibida!!");
  console.log(req.url); 
  
  const myURL = new URL(req.url, 'http://' + req.headers['host']);
  console.log("Recurso recibido: " + myURL.pathname);

  var mime2 = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'jfif'  : 'image/jfif',
 };
  // -- Buscamos el "." final para poder indicar que tipo mime es
  let hastaPunto = myURL.pathname.lastIndexOf(".");
  let type = myURL.pathname.slice(hastaPunto+1);
  let typeMime = type;
  console.log("mime",mime2[type]);

  /* var cadenaDeTexto = "https://www.midominio.com/sites/document/indice1.txt";
  var hastaSites = cadenaDeTexto.indexOf('/document');
  console.log(hastaSites);
  console.log(cadenaDeTexto.substring(0, hastaSites+1));
 */

  //-- Valores de la respuesta por defecto
  let code = 200;
  let message = "OK";
  //-- Fichero a leer
  let page = "tienda.html";

  //-- Cualquier recurso que no sea la página principal
  //-- genera un error
   if (myURL.pathname != '/') {
      code = 404;
      message  = "Not Found";
      //-- Fichero a leer
      page = "tienda_error.html";
   }


  //-- Definir tipo de archivo html.
  var mime = "text/html"

  const data = fs.readFileSync(page,'utf8');
    
  // const data = fs.readFileSync(FICHERO, 'utf8');
  console.log("Lectura completada...")
  console.log("Contenido del fichero: \n")
  //console.log(data); 
  

  res.statusCode = code; // VEEER MEJOR
  res.statusMessage = message;
  res.writeHead(code, {'Content-Type': mime});
  res.write(data);
  res.end();

  
});


//-- Activar el servidor:
server.listen(PUERTO);

console.log(" Server activado!. Escuchando en puerto: " + PUERTO);