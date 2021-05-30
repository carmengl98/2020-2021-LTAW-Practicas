const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const sonido = document.getElementById("sonido");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//El evento se activa cuando se recibe un mensaje
socket.on("message", (msg)=>{
    //Se añade el mensaje al display
    display.innerHTML += '<p style="color:grey">'+ msg + '</p>';
    sonido.play();
});


//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(msg_entry.value);
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}

