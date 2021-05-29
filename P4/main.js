//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
//-- Cargar el módulo de electron
const electron = require('electron');

const PUERTO = 9000;

let user = 0;
username = [];

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public_chat/index.html");
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
  if(!user){
    username.push('User'+user); 
  }
  console.log(username);
  msg_inf1 = "BIENVENIDO AL CHAT!!";
  socket.send('<p style="color:lightblue">'+ msg_inf1 +'</p>');

  msg_inf2 = "** NUEVO USUARIO CONECTADO **";
  socket.send('<p style="color:lightblue">'+ msg_inf2 +'</p>');
  console.log('Usuarios conectados:'.green, user);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    if (user >= 0){
      user = user - 1;
      console.log('Usuarios conectados:'.green, user);
      username.pop();
      console.log(username);
    }
  });

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);
    if (msg.startsWith('/')) {
      switch(msg){
        case '/help':
          const message_listcommand = '/help --> Lista con todos los comandos soportados.' + '<br>' +
                 '/list --> Número de usuarios conectados.' + '<br>' +
                 '/hello --> El servidor nos devolverá el saludo.' + '<br>' +
                 '/date --> Fecha actual.';

          io.send(message_listcommand);
          break;
        case '/hello':
          const message_hello = '¡¡Bienvenido al chat!!';
          io.send(message_hello);
          break;
        case '/date':
          d = new Date();
          const message_date = 'Fecha: ' + d.getDate() +'/'+ d.getMonth()+ +'/' + d.getFullYear();
          io.send(message_date);
          break;
       case '/list': 
          const message_users = 'Usuarios conectados: ' + username;
          io.send(message_users);
          break;
        default:
          io.send('El comando es incorrecto!!. Intoduzca /help para visualizar los comandos.');
          return;
      }
    }else{
      if(user){
        io.send(username + ' : ' + msg);
      }else{
        io.send('Tiene que registrarse!!');
      }
    }

  });

});


console.log("Arrancando electron...");

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,   //-- Anchura 
        height: 600,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });
 
    //-- Cargar interfaz gráfica en HTML
    win.loadFile("index.html");
  

});


//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);