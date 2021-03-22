//-- Crear una variable con la estructura definida
//-- en un fichero JSON

const fs = require('fs');

//-- Npmbre del fichero JSON a leer
const FICHERO_JSON = "Ej03-tienda-json-fich.json"

//-- Leer el fichero JSON
//Leemos el fichero de forma sincrona y guardamos el texto en tienda_json
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
//Parseamos el fichero json de datos; es decir lo pasamos de json a js
const tienda = JSON.parse(tienda_json);

//-- Mostrar informacion sobre la tienda
console.log("Productos en la tienda: " + tienda.length);

//-- Recorrer el array de productos
tienda.forEach((element, index)=>{
  console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
});