const WebSocketServer = require('websocket').server;
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 8000;

//-- Crear una aplicación web vacia
const app = express();

//-- Asociar el servidor http con la app de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const wsServer = new WebSocketServer({httpServer: server});

const socket = io();

//-- Conexión al websocket
io.on("message", (req) => {
    console.log("Conexión establecida".yellow);

    //-- Retrollamada de mensaje recibido
    socket.on('message', (message) => {
        console.log("MENSAGE RECIBIDO");
        console.log("  Tipo de mensaje: " + message.type);
        if (message.type === 'utf8') {
            console.log("  Mensaje: " + message.utf8Data.green);

            //-- Enviar el eco
            socket.sendUTF(message.utf8Data);
        }
    });


});


//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);