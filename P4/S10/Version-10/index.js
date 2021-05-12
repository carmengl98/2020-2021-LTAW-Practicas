const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const print = document.getElementById("print");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();


btn_test.onclick = () => {
    display.innerHTML += "TEST! ";
    console.log("Botón apretado!");
}

//-- Mensaje recibido del proceso MAIN

//Llamamos al  modulo ipcRenderer del modulo electron.
//--> Conectate al evento print y si se activa el evento(recibimos un mensaje de la categoría)
//lo imprimimos en la consola y lo metemos en el parrafo que hemos denominado print.
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.textContent = message;
  });
