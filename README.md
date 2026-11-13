# PokeApp - TP9

**Trabajo Práctico N°9 - Funcionamiento de Sistemas Digitales
Profesor:** Roberto Argumedo (Tito Argumedo)
**Nombre:** Tomás Cardozo

## Descripción

**PokeApp** es una aplicación web educativa inspirada en el universo Pokémon. Permite recorrer una Pokédex, consultar la información detallada de los Pokémon, registrar usuarios, iniciar sesión y administrar nuevos registros. Además, incluye una batalla interactiva basada en decisiones.

## Funcionalidades

* **Inicio:** pantalla de bienvenida y navegación entre las distintas secciones.
* **Pokédex:** tarjetas con número, nombre, imagen, tipo y rareza de cada Pokémon.
* **Búsqueda:** búsqueda de Pokémon por nombre. En esta versión se compara el nombre completo respetando las mayúsculas y minúsculas.
* **Detalle:** información de cada Pokémon (descripción, tipos, altura, peso, generación, estadísticas, habilidad, evolución y recursos multimedia disponibles).
* **Registro de usuarios:** creación de cuentas comunes y control de nombres de usuario y correos duplicados.
* **Inicio y cierre de sesión:** identificación del usuario conectado y visualización de su perfil.
* **Perfil de administrador:** formulario para agregar nuevos Pokémon, con validaciones y comprobación de ID repetido.
* **Carga múltiple:** se pueden incorporar varios Pokémon de manera consecutiva; no hay un límite de una sola carga ni se reemplazan los anteriores.
* **Persistencia:** los Pokémon y usuarios se guardan con JSON en `localStorage` y se recuperan al volver a abrir la aplicación en el mismo navegador y origen.
* **Batalla:** selección de Pikachu o Squirtle para combatir contra Charmander, con ataques, una poción, turnos y resultados de victoria o derrota.

## Tecnologías utilizadas:

|Tecnología|Uso|
|-|-|
|**HTML5**|Estructura, formularios y navegación.|
|**CSS3**|Diseño, tarjetas y estilos de las pantallas.|
|**JavaScript**|Funciones, condiciones, bucles, objetos, arrays, eventos y DOM.|
|**Módulos ES ("import" / "export")**|Organización del código en distintos archivos.|
|**JSON y "localStorage"**|Guardado y recuperación de datos en el navegador.|
|**Git y GitHub**|Control de versiones y registro progresivo de avances.|
|**ChatGPT Premium**|Investigación sobre JavaScript, ayuda con la implementación de código en los archivos .js, corrección de líneas.|

## Estructura del proyecto:


PokeAppTomic/
├── index.html                 
├── README.md                   
├── css/
│   └── styles.css             
├── js/
│   ├── app.js                  
│   ├── persistencia.js         
│   └── db/
│       ├── pokemones.js      
│       ├── usuarios.js         
│       └── game.js             
└── assets/
    ├── img/                   
    ├── sound/                 
    └── avatar/                 

*El proyecto también puede contener archivos de ejemplos y prácticas de clase, los archivos indicados arriba son los principales para el funcionamiento de la aplicación.*

## Cómo ejecutar PokeApp

1. Descargá o cloná el repositorio de GitHub.
2. Abrí la carpeta del proyecto en **Visual Studio Code**.
3. Abrí "index.html" con la extensión **Live Server** (opción **Open with Live Server**).
4. Usá el menú superior para acceder a la Pokédex, el registro, el inicio de sesión, el perfil o la batalla.

> Importante: ejecutá la aplicación mediante un servidor local, porque utiliza módulos de JavaScript. No se recomienda abrir "index.html" directamente con "file://".

## Usuarios y permisos

La aplicación distingue dos roles:

* **Usuario común:** puede registrarse, iniciar sesión, consultar por un Pokémon y acceder a las secciones generales.
* **Administrador:** además, puede acceder al formulario de carga y agregar nuevos Pokémon.

Para probar el perfil de administrador, el proyecto incluye una cuenta de demostración en "js/db/usuarios.js":
Usuario:    1234
Contraseña: 1234

Los nuevos usuarios se registran con "admin: false". Los datos de prueba pueden persistir en el navegador después de cerrar la aplicación.

## Cómo agregar un Pokémon

1. Iniciá sesión como **administrador**.
2. Abrí **Mi perfil** y buscá el formulario **Nuevo Pokémon**.
3. Completá el número de Pokédex, nombre, descripción, tipos, estadísticas, evolución, rareza, imagen y sonido.
4. Presioná **Agregar Pokémon**.
5. Entrá en **Pokédex** y verificá que se muestre la nueva tarjeta.
6. Volvé al formulario y repetí el procedimiento con otro número para agregar más Pokémon.
7. Actualizá la página para comprobar que los registros permanecen guardados.

El número de Pokédex debe ser único. La imagen y el sonido se indican mediante rutas o direcciones válidas, si un recurso no existe, podría no mostrarse o reproducirse. Las imágenes *shiny* también requieren que el archivo indicado esté disponible.

## Cómo funciona la batalla

La lógica de la batalla está separada de la aplicación principal en **"js/db/game.js"**. "app.js" únicamente importa e inicializa ese módulo.

1. Entrá a **Batalla** desde el menú.
2. Elegí **Pikachu** o **Squirtle**.
3. En cada turno seleccioná **Atacar** o **Usar poción**.
4. El ataque del jugador reduce los HP de Charmander, si sigue en pie, Charmander contraataca.
5. La poción permite recuperar hasta 20 HP, sin superar los 50 HP iniciales, y solo hay una por partida.
6. La partida termina cuando alguno de los dos Pokémon se queda sin HP. Luego podés volver a jugar o regresar al inicio.

La batalla es **guionada y basada en decisiones**, tal como solicita el trabajo práctico; no busca reproducir el sistema completo de combate de los videojuegos originales.

## Persistencia de datos

El archivo "js/persistencia.js" utiliza:

* "JSON.stringify()" para convertir objetos y arrays en texto JSON.
* "localStorage.setItem()" para guardar datos.
* "localStorage.getItem()" para recuperarlos.
* "JSON.parse()" para convertir nuevamente ese texto en objetos y arrays.
* "push()" para agregar Pokémon o usuarios a sus respectivos arrays.

Se utilizan las claves **"pokemones"**, **"usuarios"** y **"usuarioActivoId"** en "localStorage".

Los datos quedan guardados **solo en ese navegador y para ese origen**. No existe una base de datos remota ni sincronización entre dispositivos. Borrar los datos del sitio en el navegador puede eliminar los registros agregados.

## 

