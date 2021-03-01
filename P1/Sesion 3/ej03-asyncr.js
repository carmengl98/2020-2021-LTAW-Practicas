const http = require('http');
/*asincrona > para mejorar la eficiencia del servidor(pierde menos tiempo)
con la asincrona puedo atender a más servidores  */
const PUERTO = 8080;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("\nMENSAJE A")

  req.on('data', (cuerpo) => {
    console.log("MENSAJE B")
  });

  req.on('end', ()=> {
    console.log("MENSAJE C");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

  console.log("MENSAJE D");

});

console.log("MENSAJE E");
server.listen(PUERTO);
console.log("MENSAJE F");

/*En qué orden aparecen en la consola???*/
/*Situación 1: Se arranca el servidor. Se recibe una solicitud del cliente de tipo GET, sin cuerpo en el mensaje*/


/*Se ejecuta en orden :cuando se lanza el seridor , se establece la 
funcion de retrollamada y cuando llega una solicitud se ejecuta 
la fución, mientras que no pase esto sigue ejecutando otras cosas*/


/* Primero se ejecutan el mensaje E y el mensaje F poque no
tiene que ocurrir ningún evento para que estos se impriman*/
/*Si ocurre algún evento(como recibir una peticion) antes de alguno 
de estos mensajes, el evento queda pendiente (no atiende eventos hasta que termina)*/
/*Cuando haya una solicitud se imprimiría el mensaje A y el mensaje D ya que el 
resto esperan una retrollamada. 
Si llegan datos('data') se imprime el mensaje B y cuando llega el end
se imprime el mensaje C   */

/*Situación 2: Tras la situación anterior, se recibe ahora una solicitud que tiene información en el cuerpo */

/*(Pensar en cuando se establece una retrollamada)*/
