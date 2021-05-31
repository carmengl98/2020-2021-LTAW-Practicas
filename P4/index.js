const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_prueba = document.getElementById("btn_prueba");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const info4 = document.getElementById("info4");
const num_user = document.getElementById("num_user");
const display = document.getElementById("display");
const print = document.getElementById("print");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.versions.node;
info2.textContent = process.versions.chrome;
info3.textContent = process.versions.electron;

btn_prueba.onclick = () => {
    //mensaje que sale por la interfaz gráfia
    display.innerHTML += "Mensaje de prueba!";
    console.log("Botón apretado!");

    //-- Enviar mensaje al proceso principal
    // un mensaje asociado al evento test
    electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
    //Este mensaje lo recibe el proceso principal cuando apretamos el boton
}

electron.ipcRenderer.on('ip', (event, address) => {
    console.log(address);
    info4.textContent = address;
});

electron.ipcRenderer.on('num_user', (event,user) => {
    console.log("Recibido: " + user);
    num_user.textContent = user;
});

//-- Mensaje recibido del proceso MAIN
//mensaje asociado al evento print
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.innerHTML += message;

});
