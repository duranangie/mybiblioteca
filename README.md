# Descripción

Este proyecto consiste crear un biblioteca con funciones de JavaScript que interactúan con una API remota para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en registros de libros. Estas funciones se utilizan para conectarse a la API y realizar operaciones en la base de datos de libros.

## Configuración

Antes de utilizar estas funciones, asegúrate de configurar correctamente la variable `uri` en el archivo `config.js` para que apunte a la ubicación correcta de tu API. Además, asegúrate de que tu API esté en ejecución en el servidor especificado.

## Uso

El archivo `api.js` contiene las siguientes funciones:

### `getAll()`

Esta función realiza una solicitud GET para recuperar todos los registros de libros desde la API y los muestra en la consola.

### `post(obj)`

Esta función toma un objeto como argumento y realiza una solicitud POST para crear un nuevo registro de libro en la API. El objeto debe contener la información necesaria para crear un libro, como el título, la fecha de lanzamiento, etc.

### `deleteOne(id)`

Esta función toma un ID como argumento y realiza una solicitud DELETE para eliminar un registro de libro específico de la API.

### `putOne(obj)`

Esta función toma un objeto como argumento y realiza una solicitud PUT para actualizar un registro de libro existente en la API. El objeto debe contener información actualizada del libro, como la fecha de lanzamiento.

## Validación de Datos

Las funciones `deleteOne` y `putOne` incluyen una validación básica de datos para garantizar que los argumentos proporcionados cumplan con ciertos criterios antes de realizar la solicitud a la API. Si los datos no cumplen con los criterios, se devuelve un mensaje de error.

## Instalar

pasos para instalar en Visual Studio Code:
1. Clonar el archivo
`git clone https://github.com/duranangie/mybiblioteca.git`
2. Instalar en consola :
`npm init -y`
3. Instala la carpeta de node_modules:
`npm install`
4. 	Correr el programa
`npm run dev`


## Contribución

Si deseas contribuir a este proyecto, ¡siéntete libre de hacerlo! Puedes enviar solicitudes de extracción (pull requests) para mejoras o correcciones.

## Licencia

Este proyecto se encuentra bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles sobre los términos de uso y distribución.