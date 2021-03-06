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
    //mensaje que sale por la interfaz gráfia
    display.innerHTML += "TEST! ";
    console.log("Botón apretado!");

    //-- Enviar mensaje al proceso principal
    //mensaje asociado al evento test
    electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
    //Este mensaje lo recibe el proceso principal cuando apretamos el boton
}

//-- Mensaje recibido del proceso MAIN
//mensaje asociado al evento print
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.textContent = message;
  });
