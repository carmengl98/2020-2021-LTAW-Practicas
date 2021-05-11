//-- Módulo para crear clientes con la API websockets del W3C
const W3CWebSocket = require('websocket').w3cwebsocket;

const colors = require('colors');

//-- Crear el objeto cliente con la URL a la que conectarse (local)
const client = new W3CWebSocket('ws://localhost:8000/');


//En este ejemplo se envía un mensaje inicial al establecerse la conexión entre el cliente y el servidor 
//y luego se envían mensajes periódicamente cada 2 segundos. (con websocket) 
//Cada mensaje se numera utilizando un contador que empieza a contar desde 1.

//-- Función de retrollamada al establecerse la conexión
client.onopen = () => {
    console.log('CLIENTE. Conectado al Servidor'.yellow);

    const MSG = "Holiiii-"; // mensaje
    let cont = 1;

    //-- Enviar mensaje inicial
    client.send("Mensaje inicial");

    //-- Enviar mensajes cada 2 segundos...
    setInterval(()=>{
      //-- Solo enviamos el mensaje si la conexión está abierta
      if (client.readyState == client.OPEN) {
        console.log("Enviado: " + (MSG + cont).blue)
        client.send(MSG + cont);
        cont = cont + 1;
      }
    }, 2000);

};

//-- Retrollamada de mensaje recibido
client.onmessage = (e) => {

    //-- Solo imprimir los mensajes de texto
    if (typeof e.data === 'string') {
        console.log("Mensaje recibido: " + e.data.green);
    }
};

//-- Retrollamada de conexión terminada
client.onclose = () => {
    console.log('CLIENTE: Conexión terminada'.yellow);
};

