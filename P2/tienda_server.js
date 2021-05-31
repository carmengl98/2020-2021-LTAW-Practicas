console.log("Ejecutando Javascript...");

//-- SERVIDOR: Bucle principal de atención a clientes
//-- Servidor JSON

const http = require('http');
const fs = require('fs');
const PUERTO = 9000;

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('form_user.html','utf-8');

//-- HTML de la página de respuesta
const RESPUESTA = fs.readFileSync('form_resp.html', 'utf-8');

//-- Cargar la Página de error
const ERROR = fs.readFileSync('tienda_error.html');

//-- Cargar pagina web principal
const MAIN = fs.readFileSync('index_tienda.html','utf-8');

//-- Leer fichero JSON con los productos
const TIENDA_JSON = fs.readFileSync('productos_tienda.json');

//-- Obtener el array de productos
//-- Crear la estructura tienda a partir del contenido del fichero
let tienda = JSON.parse(TIENDA_JSON);

//-- Mostrar informacion sobre la tienda
console.log("Productos en la tienda: " + tienda.length);

//-- Recorrer el array de productos
/* tienda.forEach((element, index)=>{
  console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
}); */



//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => { 

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);  
    console.log("");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("  Ruta: " + myURL.pathname);
    console.log("  Parametros: " + myURL.searchParams);

    //-- Leer recurso y eliminar la / inicial
    let filename = myURL.pathname;
    filename = filename.substr(1); 
    console.log('recursooooooooooooooo',filename);

     //-- Leer las cookies
    const cookie = req.headers.cookie;
    console.log("Cookie---------------> " + cookie);

    var mime = {
        '/' : 'text/html',
        'html' : 'text/html',
        'css'  : 'text/css',
        'jfif'  : 'image/jfif',
        'png'  : 'image/png',
        'gif'  : 'image/gif',
        'json' : 'application/json',
      
    };
    
    let hastaPunto = myURL.pathname.lastIndexOf(".");
    let type = myURL.pathname.slice(hastaPunto+1);
    console.log("Mime -------->",mime[type]);
    
    switch (filename) {
        case '':
            content = MAIN;
            if (cookie) {
                console.log('Cookie!!!!!!!')
                //-- Obtener un array con todos los pares nombre-valor
                let pares = cookie.split(";");
                console.log('Pareeees---->',pares);
                //-- Variable para guardar el usuario
                let user;
                console.log('useeer---->',user);
            } else {
                console.log('Nooooo cookie');
                
            }
            break;

        case 'procesar':
            //-- Leer los parámetros
            let nombre = myURL.searchParams.get('nombre');
            let apellidos = myURL.searchParams.get('apellidos');
            console.log(" Nombre---------> " + nombre);
            console.log(" Apellidos----> " + apellidos);

            res.setHeader('Set-Cookie',apellidos);

            content = RESPUESTA;
            //-- Reemplazar las palabras claves por su valores en la plantilla HTML
            content = RESPUESTA.replace("NOMBRE", nombre);
            content = content.replace("APELLIDOS", apellidos);
            //-- si el usuario es Chuck Norris se añade HTML extra
            let html_extra = "";
            if (nombre=="Chuck" && apellidos=="Norris") {
                html_extra = "<h2>Chuck Norris no necesita registrarse</h2>";
            }
            mime[type]= "text/html";
            content = content.replace("HTML_EXTRA", html_extra);
            break;

        case 'tienda':
            console.log("Peticion de Productos!")
            content_type = "application/json";

            //-- Leer los parámetros
            let param1 = myURL.searchParams.get('param1');

            param1 = param1.toUpperCase();

            console.log("  Param: " +  param1);

            let result = [];

            for (let prod of productos) {

                //-- Pasar a mayúsculas
                prodU = prod.toUpperCase();

                //-- Si el producto comienza por lo indicado en el parametro
                //-- meter este producto en el array de resultados
                if (prodU.startsWith(param1)) {
                    result.push(prod);
                }
                
            }

            console.log(result);
            //-- También podemos hacer la operación inversa: pasar una variable a formato JSON. Se hace con el método:
            // JSON.stringify(variable)
            content = JSON.stringify(result);
            break;

        case 'cliente.js':
            //-- Leer fichero javascript
            console.log("recurso---------> " + filename);
            fs.readFile(filename, 'utf-8', (err,data) => {
                if (err) {
                    console.log("Error: " + err)
                    return;
                } else {
                  res.setHeader('Content-Type', 'application/javascript');
                  res.write(data);
                  res.end();
                }
            });
            
            return;
            break;
    
        case 'tienda.html':
            content = MAIN;
            break; 
        case 'form_user.html':
            content = FORMULARIO;
            break; 
        case 'libro1.html':
            content = fs.readFileSync(filename,'utf-8');
            break; 
        case 'libro2.html':
            content = fs.readFileSync(filename,'utf-8');
            break; 
        case 'libro3.html':
            content = fs.readFileSync(filename,'utf-8');
            break; 
        case 'libros.css':
            content = fs.readFileSync(filename);
            break; 
        case 'tienda.css':
            content = fs.readFileSync(filename);
            break;
        case 'img_tienda/licencia.png':
            content = fs.readFileSync(filename);
            break;   
        case "img_tienda/Libro_1.jfif":
            content = fs.readFileSync(filename);
            break;
        case "img_tienda/Libro_2.jfif":
            content = fs.readFileSync(filename);
            break; 
        case "img_tienda/Libro_3.jfif":
            content = fs.readFileSync(filename);
            break;  
        case "img_tienda/informacion.png":
            content = fs.readFileSync(filename);
            break;   
        //-- Si no es ninguna de las anteriores devolver mensaje de error
        default:
            /////////////////////////////////
            res.setHeader('Content-Type','text/html');
            res.statusCode = 404;
            res.write(ERROR);
            res.end();
            return;
    }
    
    //-- Si hay datos en el cuerpo, se imprimen
    req.on('data', (cuerpo) => {
  
        //-- Los datos del cuerpo son caracteres
        req.setEncoding('utf8');
        console.log(`Cuerpo (${cuerpo.length} bytes)`);
        console.log(` ${cuerpo}`);
        usuario= recortar(data, "=")
        console.log(usuario);
     });
        
    
        //-- Esto solo se ejecuta cuando llega el final del mensaje de solicitud
        req.on('end', ()=> {
        //-- Generar respuesta
        
        res.setHeader('Content-Type', mime[type]);
        res.write(content);
        res.end();
        
    });
    
    
   /*   //-- Generar respuesta
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end() */
  
  });
  
  server.listen(PUERTO);
  console.log("Escuchando en puerto: " + PUERTO);
  