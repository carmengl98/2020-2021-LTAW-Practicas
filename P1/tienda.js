//-- Importo los módulos http,url y fs
const http = require('http');
const url =require('url');
const fs = require('fs');

//-- Definir el puerto a utilizar
const PUERTO = 9000;


//-- Crear el servidor
const server = http.createServer((req, res) => {
    
  //-- Indicamos que se ha recibido una petición
  console.log("Petición recibida!!");
  console.log(req.url); 
  // res.statusCode = 404; /*Este mensaje no sale por pantalla*/
  // res.statusMessage = "Not Found";
  res.statusCode = 200;
  res.statusMessage = "OK ";
  res.setHeader('Content-Type', 'text/plain');
  res.write("Soy el servidor\n");
  res.end()
  

});
//-- Fichero a leer
const FICHERO = 'tienda.html';

const pagina = fs.readFile('tienda.html', (err, data) => {

    if (err) {  //-- Ha ocurrido algun error
     console.log("Error!!")
     console.log(err.message);
    } 
    else {  //-- Lectura normal
        console.log("Lectura completada...")
        console.log("Contenido del fichero: \n")
        console.log(data);
    }
});

//-- Activar el servidor:
server.listen(PUERTO);

console.log(" Server activado!. Escuchando en puerto: " + PUERTO);