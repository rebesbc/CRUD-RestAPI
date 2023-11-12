# Examen Práctico Individual
**Ingeniería Web**

ISC-1605: Ing. Jorge Moya

Rebeca Sofía Bon Cabanillas, #1917029

## Proyecto: REST API

Se desarrolló una RestAPI con NodeJs, la cual cumple las funciones de un clásico **CRUD** que implementa las siguientes características:
1. Pueda mostrar un listado de todos los elementos,
2. Pueda crear un elemento y agregarlo a la lista.
3. De ese listado pueda seleccionar un elemento y mostrar todos los detalles del mismo
4. En detalles o en otra pantalla pueda editar y guardar los cambios de este elemento.
5. Pueda borrar el elemento en cuestión

Para la persistencia de datos, se utiliza una base de datos con MySQL.


## Modelo aplicado: Libro
| Atributo | Tipo de dato |
| ----------- | ----------- |
| ID | Numérico |
| Título | Cadena de texto | 
| Autor | Cadena de texto | 
| Editorial | Cadena de texto | 
| ISBN | Cadena de texto | 
| Fecha de publicación | Fecha y hora | 


