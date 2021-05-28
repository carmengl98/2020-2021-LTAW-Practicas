//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 9000;

var user = 0;



//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación Web!!!' + '<p><a href="/public_chat/index.html">Test</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public_chat'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow);
  
  user = user + 1;
  console.log('Usuarios conectados:'.green, user);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    if (user >= 0){
      console.log('Usuarios conectados:'.green, user);
    }
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);
    switch(msg){
      case '/help':
        const message_listcommand = '/help --> Mostrará una lista con todos los comandos soportados.' + '<br>' +
                            '/list --> Devolverá el número de usuarios conectados.' + '<br>' +
                            '/hello --> El servidor nos devolverá el saludo.' + '<br>' +
                            '/date --> Nos devolverá la fecha.';

        io.send(message_listcommand);
        break;
      case '/hello':
        const message_hello = '¡¡Bienvenido al chat!!';
        io.send(message_hello);
        break;
      case '/date':
        d = new Date();
        const message_date = 'Fecha: ' + d.getDate() +'/'+ d.getMonth() +'/' + d.getFullYear();
        io.send(message_date);
        break;
      case '/list': 
        const message_users = 'Usuarios conectados: ' + user;
        io.send(message_users);
      break;
      default:
        if(msg[0] == '/'){
          io.send('El comando es erroneo!!')
        }else{
          socket.send(msg);
        }
        return;
    }

    //-- Reenviarlo a todos los clientes conectados
    //io.send(msg);
    //socket.send(msg);
    //io.send(data);--> envia  a todos los clientes que están actualmente conectados

  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);