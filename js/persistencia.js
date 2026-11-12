import { pokemonesDefecto } from "./db/pokemones.js";
import { usuariosDefecto } from "./db/usuarios.js";

let bdPokemonesExiste = localStorage.getItem("pokemones");
let bdUsuariosExiste = localStorage.getItem("usuarios");

if (bdPokemonesExiste === null) {
  let pokemonesJson = JSON.stringify(pokemonesDefecto);
  localStorage.setItem("pokemones", pokemonesJson);
  console.log("BD de pokemones no existe, se crea en localStorage");
} else {
  console.log("BD de pokemones existe en localStorage");
}

if (bdUsuariosExiste === null) {
  let usuariosJson = JSON.stringify(usuariosDefecto);
  localStorage.setItem("usuarios", usuariosJson);
  console.log("BD de usuarios no existe, se crea en localStorage");
} else {
  console.log("BD de usuarios existe en localStorage");
}

export function leerPokemones() {
  let pokemonesJson = localStorage.getItem("pokemones");
  const pokemonesRead = JSON.parse(pokemonesJson);
  return pokemonesRead;
}

export function leerUsuarios() {
  let usuariosJson = localStorage.getItem("usuarios");
  const usuariosRead = JSON.parse(usuariosJson);
  return usuariosRead;
}

export function guardarPokemones(pokemon) {
  let pokemones = leerPokemones();
  pokemones.push(pokemon);
  localStorage.setItem("pokemones", JSON.stringify(pokemones));
  console.log(`Pokémon ${pokemon.nombre} guardado en localStorage`);
}

export function guardarUsuarios(usuario) {
  let usuarios = leerUsuarios();
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  console.log(`Usuario ${usuario.nombre} guardado en localStorage`);
}

// Actualizar los Pokémon guardados con los datos que faltan.
function actualizarDatosPokemon() {
  const pokemonesGuardados = leerPokemones();
  let huboCambios = false;

  for (let pokemon of pokemonesGuardados) {

    // Buscar el Pokémon original por ID.
    const original = pokemonesDefecto.find(function (p) {
      return p.id === pokemon.id;
    });

    // No modificar los Pokémon agregados por el usuario.
    if (!original) {
      continue;
    }

    // Agregar descripción si todavía no existe.
    if (!pokemon.descripcion || !pokemon.descripcion.trim()) {
      pokemon.descripcion = original.descripcion;
      huboCambios = true;
    }

    // Corregir rutas antiguas de imágenes.
    if (
      pokemon.imagen === "./assets/img/bulbasaur.png" ||
      pokemon.imagen === "./assets/img/squirtle.png"
    ) {
      pokemon.imagen = original.imagen;
      huboCambios = true;
    }

    // Desactivar referencias shiny antiguas sin archivos.
    const rutaShinyAntigua =
      `./assets/img/${original.nombre.toLowerCase()}-shiny.png`;

    if (
      pokemon.shiny === true &&
      pokemon.imagenShiny === rutaShinyAntigua
    ) {
      pokemon.shiny = false;
      pokemon.imagenShiny = null;
      huboCambios = true;
    }
  }

  // Guardar solamente si hubo modificaciones.
  if (huboCambios) {
    localStorage.setItem(
      "pokemones",
      JSON.stringify(pokemonesGuardados)
    );

    console.log("Datos de Pokémon actualizados correctamente.");
  }
}

// Ejecutar la actualización al abrir la aplicación.
actualizarDatosPokemon();

// EJERCICIO DE CLASE

// const colegio1 = {
//   nombre: "Del Carmen",
//   direccion: "Calle 123",
//   telefono: "555-1234",
// };
// const colegio2 = {
//   nombre: "San Jose",
//   direccion: "Avenida 456",
//   telefono: "555-5678",
// };

// // console.log(localStorage);

// let colegio1json = JSON.stringify(colegio1);

// localStorage.setItem("colegio-1", colegio1json);
// localStorage.setItem("colegio-2", colegio2);

// let colegioRead1 = localStorage.getItem("colegio-1");
// let colegioRead2 = localStorage.getItem("colegio-2");

// let colegio1Parsed1 = JSON.parse(colegioRead1);

// console.log(colegio1Parsed1);
// console.log(colegioRead2);
