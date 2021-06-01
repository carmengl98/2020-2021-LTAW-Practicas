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
const RESPUESTA_PEDIDO = fs.readFileSync('form_resp2.html', 'utf-8');

//-- Cargar la Página de error
const ERROR = fs.readFileSync('tienda_error.html');

//-- Cargar pagina web principal
const MAIN = fs.readFileSync('index_tienda.html','utf-8');

//-- Leer fichero JSON con los productos
const TIENDA_JSON = fs.readFileSync('productos_tienda.json','utf-8');

function get_cookie(req){

    //-- Leer las cookies
    const cookie = req.headers.cookie;

    if (cookie) {
        console.log("Cookie---------------------> " + cookie);

        //-- Obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
        let user;
        pares.forEach((element, index) => {
    
            //-- Obtener los nombres y valores por separado
            let [nombre, valor] = element.split('=');
            console.log('Pareeees************',element);

             //-- Leer el usuario
            //-- Solo si el nombre es 'user'
            if (nombre.trim() === 'user') {
                user = valor;
             }
        });
        console.log('Useeer ------>',user);
    } else {
        console.log('No hay cookieeee!!!!!!!');
        
    }
}
function get_compra(req){

    //-- Leer las cookies
    const cookie = req.headers.cookie;

    if(cookie){
            //-- par de nombre valor 
            let par = cookie.split(";");
            console.log(par);
            par.forEach((element,index)=>{
              let [nombre, valor] = element.split("=");

              if (nombre.trim() === 'user') {
                user = valor;
                content = content.replace("USUARIO", user);
             }

              if (nombre.trim() === 'carrito') {
                res.setHeader('Set-Cookie', element + ':' + producto);
              }

            });
    }else{
        content = content.replace("HTML_EXTRA", "Tienes que registrarte antes de realizar un pedido");
    }


}

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
    console.log("Fiiiil++++++++++++++++++",filename);
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
    
    switch (filename) {
        case '':
            content = MAIN;
            get_cookie(req);
            break;

        case 'procesar':
            //-- Leer los parámetros
            let nombre = myURL.searchParams.get('nombre');
            let usuario = myURL.searchParams.get('usuario');
            let correo = myURL.searchParams.get('correo');
            console.log(" Nombre---------> " + nombre);
            console.log(" Usuario----> " + usuario);
            console.log(" Correo----> " + correo);
            res.setHeader('Set-Cookie', "user="+ usuario);

            //-- Obtener el array de productos
            //-- Crear la estructura tienda a partir del contenido del fichero
            let info = JSON.parse(TIENDA_JSON);
            info_usuarios = info["usuarios"][0];
            //-- Mostrar informacion sobre la tienda
            console.log("Productos en la tienda*******************" + info_usuarios);

           //-- Recorrer el array de productos
            info["usuarios"].forEach((element, index)=>{
            console.log("Usuario registrado ------------------------>: " + (index + 1) + ": " + element["nombre"]+"/"+ element["user"]+"/"+ element["correo"]);
            
            content = RESPUESTA;
            let html_extra = "";
            if (correo==element["correo"] && usuario==element["user"]) {
                console.log("coincideeee");
                html_extra = "<h2>No necesita registrarse!!</h2>";
            
                //-- Reemplazar las palabras claves por su valores en la plantilla HTML
                content = RESPUESTA.replace("NOMBRE", nombre);
                content = content.replace("USUARIO", usuario);
                content = content.replace("CORREO", correo);
                content = content.replace("HTML_EXTRA", html_extra);
                mime[type]= "text/html";
            }else{
                content = fs.readFileSync('form_user_inval.html','utf-8'); 
                mime[type]= "text/html";
            }

            });
            break;

        case 'productos':
            info_productos = JSON.parse(TIENDA_JSON);
            productos = info_productos["productos"];
            //-- Mostrar informacion sobre la tienda
            console.log("Productos en la tienda*******************" + productos[1]["nombre"]);
            content_type = "application/json";

            //-- Leer los parámetros
            let param1 = myURL.searchParams.get('param1');

            param1 = param1.toUpperCase();

            console.log("Param: " +  param1);

            let result = [];

            for (let prod of productos) {

                console.log("oooo",prod["nombre"]);

                //-- Pasar a mayúsculas
                prodU = prod["nombre"].toUpperCase();
                //-- Si el producto comienza por lo indicado en el parametro
                //-- meter este producto en el array de resultados
                if (prodU.startsWith(param1)) {
                    result.push(prod);
                }
                
            }

            //-- Pasar una variable a formato JSON. Se hace con el método:
            console.log(result[0]);
            content = JSON.stringify(result);
            mime[type] ="text/html";
            break;
            
        case 'pedidos':
            content = fs.readFileSync('form_resp2.html', 'utf-8'); 
            //-- Leer los parámetros
            let usuari = myURL.searchParams.get('usuario');
            let direccion = myURL.searchParams.get('direccion');
            let tarjeta = myURL.searchParams.get('tarjeta');
            console.log(" Usuario----> " + usuari);
            console.log(" Envio ----> " + direccion);
            console.log(" tarjeta---------> " + tarjeta);
            res.setHeader('Set-Cookie', usuari);

            info_pedidos = JSON.parse(TIENDA_JSON);
            info_pedidos = info_pedidos["pedidos"][1];
            //-- Mostrar informacion sobre la tienda
            console.log("Productos en la tienda *****************" + info_pedidos);

              
            //-- Reemplazar las palabras claves por su valores en la plantilla HTML
            content = content.replace("USUARIO", usuari);
            content = content.replace("DIRECCION", direccion);
            content = content.replace("TARJETA", tarjeta);
            //content = content.replace("HTML_EXTRA", html_extra);
            mime[type]= "text/html";

        case 'cliente.js':
            //-- Leer fichero javascript
            console.log("CLIENTEEEEE---------> " + filename);
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
            get_cookie(req);
            break; 
        case 'form_user.html':
            content = FORMULARIO;
            break; 
        case 'mi_compra.html':
            content = fs.readFileSync(filename,'utf-8');
            get_compra(req);
            break; 
        case 'form_compra.html':
            content = fs.readFileSync(filename,'utf-8');
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
        case 'img_tienda/shoppingcar.png':
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
        case 'img_tienda/licencia.png':
            content = fs.readFileSync(filename);
            break;   
        //-- Si no es ninguna de las anteriores devolver mensaje de error
        default:
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
  
  });
  
  server.listen(PUERTO);
  console.log("Escuchando en puerto: " + PUERTO);
  