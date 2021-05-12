console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");

btn_test.onclick = () => {
    //añade en el display la cadena TEST  cada vez que se aprieta el boton
    display.innerHTML += "TEST! "; 
    //imprime el siguiente mensaje por la consola cada vez ques se aprieta el boton
    console.log("Botón apretado!");
}