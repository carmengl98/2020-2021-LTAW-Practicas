
//-- Elementos HTML para mostrar informacion
const display1 = document.getElementById("display1");

//-- Caja de busqueda
const caja = document.getElementById("caja");

//-- Retrollamda del boton de Ver productos
caja.oninput = () => {

    //-- Crear objeto para hacer peticiones AJAX
    const m = new XMLHttpRequest();

    //-- Función de callback que se invoca cuando
    //-- hay cambios de estado en la petición
    m.onreadystatechange = () => {

        //-- Petición enviada y recibida. Todo OK!
        if (m.readyState==4) {
            console.log('holaa');

            //-- Solo la procesamos si la respuesta es correcta
            if (m.status==200) {
                console.log('OK');
                
                //-- La respuesta es un objeto JSON
                let productos = JSON.parse(m.responseText)

                console.log(productos);

                display1.innerHTML += producto
            }

        }
    }

         //-- Configurar la petición
      m.open("GET","/productos" + caja.value, true);

      //-- Enviar la petición!
      m.send();
            

} 