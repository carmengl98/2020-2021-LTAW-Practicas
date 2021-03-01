const http = require('http');

const PUERTO = 8080;

//-- Imprimir informacion sobre el mensaje de solicitud
function print_info_req(req) {

    console.log("");
    console.log("Mensaje de solicitud");
    console.log("====================");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("Version: " + req.httpVersion)
    console.log("Cabeceras: ");

    //-- Recorrer todas las cabeceras disponislbes
    //-- imprimiendo su nombre y su valor
    /*hname > variable temporal
      req.headers > objeto que contiene la propiedad y su valor */
    for (hname in req.headers) 
      console.log(`  * ${hname}: ${req.headers[hname]}`);
        /* ${hname} nombre de la cabecera
            ${req.headers[hname]} */

    //-- Construir el objeto url con la url de la solicitud
    /*Nombre de recurso: req.url
     Origen: 'http://' + req.headers['host'] */
    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("URL completa: " + myURL.href);
    console.log("  Ruta: " + myURL.pathname); 
}

//-- SERVIDOR: Bucle principal de atención a clientes
/*req es un objeto de tipo mensaje de solicitud*/
/*Punto de entrada al que se le pasan los parametros de 
 mensaje de solicitud y el mensaje de respuesta */
const server = http.createServer((req, res) => {

  //-- Petición recibida
  //-- Imprimir información de la petición
  print_info_req(req); /* Cabeza*/

  //-- Si hay datos en el cuerpo, se imprimen 
  /*Si hay datos se ejecuta la función de retrollamada*/
  req.on('data', (cuerpo) => {

    //-- Los datos del cuerpo son caracteres
    req.setEncoding('utf8'); /*Tipo de codificacion*/ 

    console.log("Cuerpo: ")
    console.log(` * Tamaño: ${cuerpo.length} bytes`);
    console.log(` * Contenido: ${cuerpo}`);
  });

  //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud
  req.on('end', ()=> {
    console.log("Fin del mensaje");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

});

server.listen(PUERTO); /*Modo escucha*/

console.log("Ejemplo 2. Happy Server listo!. Escuchando en puerto: " + PUERTO);