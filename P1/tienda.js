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
  //console.log("----------> Petición recibida:",myURL);

  var mime = {
    '/' : 'text/html',
    'html' : 'text/html',
    'css'  : 'text/css',
    'jfif'  : 'image/jfif',
    'png'  : 'image/png',
    'gif'  : 'image/gif',
  
  };

  let filename = ""
  
  //-- Obtenemos el fichero correspondiente.
  if(myURL.pathname == '/'){
    filename += "./tienda.html"; //-- Página principal de la tienda
  }else{
    filename += "." + myURL.pathname;
  }
  console.log("Filename:",filename);

  // -- Buscamos el "." final para poder indicar que tipo mime es
  let hastaPunto = myURL.pathname.lastIndexOf(".");
  let type = myURL.pathname.slice(hastaPunto+1);
  console.log("Tipo de mime:",mime[type]);

  //-- Valores de la respuesta por defecto
  let code = 200;
  let message = "OK";

  //-- Leer fichero
  fs.readFile(filename, function(err, data) {
     //-- Fichero no encontrado. Devolver mensaje de error
    if ((err|| (filename == 'error.html'))) {
      code = 404;
      message = "Not Found";
      data = fs.readFileSync('./tienda_error.html')
      res.writeHead(code, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }else{
      res.statusCode = code; 
      res.statusMessage = message;
      res.writeHead(code, {'Content-Type': mime[type]});
      res.write(data);
      res.end();
    }
    
  });
  
  //console.log("Contenido del fichero: \n")
  //console.log(data); 
   
});


//-- Activar el servidor:
server.listen(PUERTO);

console.log(" Server activado!. Escuchando en puerto: " + PUERTO);