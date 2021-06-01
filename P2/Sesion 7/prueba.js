/* La cadena de búsqueda se introduce en el cliente en un elemento HTML de tipo entrada de texto (input text)

El servidor tiene el recurso /productos al que se le pasa como parámetro la cadena de búsqueda (param1). 
Ej. /productos?param1=ard

Cuando el servidor recibe una petición construye un nuevo array con los resultados de la búsqueda, y es el que se devuelve al cliente. 
Para construirlo se recorren todos los productos de la base de datos y los que cuadren con la búsqueda se añaden al array

Estudia los métodos utilizados para esto. Y realiza búsquedas de información sobre ellos para entender cómo funcionan 
(push, startWith, toUpperCase...

El cliente tiene una función de retrollamada asociada al evento oninput que se genera cada vez que hay un cambio en la entrada de texto. 
De esta manera, cada vez que hay un cambio en el texto se realiza una petición AJAX al servidor */