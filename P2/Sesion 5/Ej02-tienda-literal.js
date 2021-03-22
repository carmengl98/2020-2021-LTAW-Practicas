//-- Cadena con la estructura de la tienda en JSON
//Esto es una cadena definida en js con comillas te respeta los saltos de línea
const tienda_json = `[
    {
      "nombre": "Alhambra II",
      "descripcion": "Placa con FPGA ice40HX8K",
      "stock": 3
    },
    {
      "nombre": "Icestick",
      "stock": 10
    }
  ]`
  
  //-- Crear la estructura tienda a partir de la cadena en json
  // PARSE---- estructura importante que sirve para pasar el contenido de json a js
  //mi variable tienda ha sido crada a partir de una cadena
  const tienda = JSON.parse(tienda_json);
  
  //-- Mostrar informacion sobre la tienda
  console.log("Productos en la tienda: " + tienda.length);
  
  //-- Recorrer el array de productos
  tienda.forEach((element, index)=>{
    console.log("Producto: " + (index + 1) + ": " + element["nombre"]);
  });