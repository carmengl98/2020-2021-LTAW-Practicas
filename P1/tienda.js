const http = require('http');

//-- Definir el puerto a utilizar
const PUERTO = 8000;

//-- Crear el servidor
const server = http.createServer((req, res) => {
    
  //-- Indicamos que se ha recibido una petición
  console.log("Petición recibida!");

  //-- Cabecera que indica el tipo de datos del
  //-- cuerpo de la respuesta: Texto plano
  res.setHeader('Content-Type', 'text/plain');
  /*Permite añadir cabecera y su valor*/
  /*text/plain es texto plano*/

  //-- Mensaje del cuerpo
  res.write("Soy el server!!\n");

  //-- Terminar la respuesta y enviarla
  res.end();
});

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);

console.log(" Server activado!. Escuchando en puerto: " + PUERTO);