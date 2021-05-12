//-- Cargar el módulo de electron
const electron = require('electron');

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
        width: 600,  //-- Anchura  (Atributo)
        height: 600,  //-- Altura  (Atributo)
        //-- Dar valores a las propiedades: altura, anchura...
        //-- .........
   
        //-- Permitir que la ventana tenga ACCESO AL SISTEMA(Otras formas de hacerlo)
        // Usando el OBJETO webPreferences el cual tiene dos atributos que son
        //  nodeIntegration: true --> hace que la api de node sea visible
        //  contextIsolation: false --> que el proceso contenido no este aislado
        
        //con esto le damos acceso al sistema y podemos leer la info del sistema

        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  
  //-- En la parte superior se nos ha creado el menu
  //-- por defecto
  //-- Si lo queremos quitar, hay que añadir esta línea
  //win.setMenuBarVisibility(false)

  //-- Cargar contenido web en la ventana
  //-- La ventana es en realidad.... ¡un navegador!
  //win.loadURL('https://www.urjc.es/etsit');

  //-- Cargar interfaz gráfica en HTML
  win.loadFile("index.html");

});