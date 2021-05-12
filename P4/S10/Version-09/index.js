console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal

//Metemos el texto en la parte de informacion con la api process
//que nos da acceso a la arquitectura, a la plataforma, el directorio en el que estoy...
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();


btn_test.onclick = () => {
    display.innerHTML += "TEST! ";
    console.log("Botón apretado!");
}