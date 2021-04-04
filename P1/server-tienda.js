//-- Importo los módulos http,url y fs
const http = require('http');
const url = require('url');
const fs = require('fs');

//-- Definir el puerto a utilizar
const PUERTO = 9000;

//-- Crear el servidor
const server = http.createServer((req, res) => {
  
  const myURL = new URL(req.url, 'http://' + req.headers['host']);
  //console.log("Recurso recibido: " + myURL.pathname);

  //-- Indicamos que se ha recibido una petición
  console.log("----------> Petición recibida:",myURL);

  var mime = {
    '/' : 'text/html',
    'html' : 'text/html',
    'css'  : 'text/css',
    'jfif'  : 'image/jfif',
    'gif'  : 'image/gif',
  
  };

  let filename = ""
  
  //-- Obtenemos el fichero correspondiente.
  if(myURL.pathname == '/'){
    filename += "./tienda.html"; //-- Página principal de la tienda
    // -- Buscamos el "." final para poder indicar que tipo mime es
    let hastaPunto = myURL.pathname.lastIndexOf(".");
    let type = myURL.pathname.slice(hastaPunto+1);
    console.log("Tipo de mime:",mime[type]);
  }else{
    filename = "." + myURL.pathname;
    // -- Buscamos el "." final para poder indicar que tipo mime es
    let hastaPunto = myURL.pathname.lastIndexOf(".");
    let type = myURL.pathname.slice(hastaPunto+1);
    console.log("Tipo de mime:",mime[type]);
  
  }
   
  console.log("Filename:",filename);

  //-- Valores de la respuesta por defecto
  let code = 200;
  let message = "OK";

  //-- Leer fichero
  fs.readFile(filename, function(err, data) {
     //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      code = 404;
      message = "Not Found";
      return res.end("404 Not Found");
    }
    //console.log("Respuesta: 200 OK")
      
    res.statusCode = code; 
    res.statusMessage = message;
    res.writeHead(code, {'Content-Type': mime});
    res.write(data);
    res.end();
    
  });
  
  //console.log("Contenido del fichero: \n")
  //console.log(data); 
   
});


//-- Activar el servidor:
server.listen(PUERTO);

console.log(" Server activado!. Escuchando en puerto: " + PUERTO);