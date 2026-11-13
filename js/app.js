import {
  leerPokemones,
  guardarPokemones,
  leerUsuarios,
  guardarUsuarios,
} from "./persistencia.js";

// ==========================================
// ELEMENTO PRINCIPAL DE LA APLICACIÓN
// ==========================================

const app = document.querySelector("#app");

let usuarioActivo = null;

// Recuperar el usuario que había iniciado sesión
const idGuardado = localStorage.getItem("usuarioActivoId");

if (idGuardado !== null) {

  const usuarios = leerUsuarios();

  for (let usuario of usuarios) {

    if (usuario.id === JSON.parse(idGuardado)) {
      usuarioActivo = usuario;
    }

  }

}

// ==========================================
// 1. LANDING
// ==========================================

// Estructura básica de la pantalla
const landing = `
  <section class="landing">
    <h1>Bienvenido a PokeApp</h1>
    <p>Explorá el mundo Pokémon.</p>
    <p>Elegí una opción del menú para comenzar.</p>
  </section>
`;

// Función para cargar los elementos dinámicos
function cargarLanding() {
  console.log("Landing cargado");
}

// Evento del logo
const logo = document.querySelector(".header-logo img");

logo.addEventListener("click", function () {
  app.innerHTML = landing;

  cargarLanding();
});

// ==========================================
// 2. POKÉDEX
// ==========================================

// Estructura básica de la pantalla
const pokedex = `
  <section class="pokedex-section">
    <h1>Pokédex</h1>

    <div id="pokedex-gallery" class="pokedex-gallery"></div>
  </section>
`;

// Función para cargar los elementos dinámicos

function cargarPokedex(nombreBuscado) {

  
  // Si no recibimos un nombre, mostramos todos
  if (nombreBuscado === undefined) {
    nombreBuscado = "";
  }

  // Obtener los Pokémon guardados
  const pokemones = leerPokemones();

  // Seleccionar la galería
  const pokedexGallery = document.querySelector("#pokedex-gallery");

  // Limpiar la galería antes de mostrar los resultados
  pokedexGallery.innerHTML = "";

  // Contador de Pokémon encontrados
  let encontrados = 0;

  // Recorrer la base de datos
  for (let pokemon of pokemones) {

    // Mostrar todos o solamente el Pokémon buscado
    if (nombreBuscado === "" || pokemon.nombre === nombreBuscado) {

      encontrados = encontrados + 1;

    pokedexGallery.innerHTML += `
      <article class="pokemon-card">

        <div class="pokemon-image">
          <img 
            src="${pokemon.imagen}" 
            alt="${pokemon.nombre}"
          />
        </div>

        <div class="pokemon-info">

          <span class="pokemon-id">
            N.º ${pokemon.id}
          </span>

          <h2>${pokemon.nombre}</h2>

          <div class="pokemon-types">
            <span class="type type-${pokemon.tipo[0].toLowerCase()}">
              ${pokemon.tipo[0]}
            </span>
          </div>

          <p class="pokemon-rareza">
            ${pokemon.rareza}
          </p>

          <button class="btn-detalle" id="detalle-${pokemon.id}">
            Ver detalles
          </button>

        </div>

      </article>
    `;

    } // Cierra el if del nombre buscado

  } // Cierra el for de Pokémon

  // Mostrar mensaje si no encontramos ningún Pokémon
  
  if (encontrados === 0) {

    pokedexGallery.innerHTML = `
      <p>No se encontró ningún Pokémon con ese nombre.</p>
    `;

  }

  // Recorrer nuevamente los Pokémon para agregar eventos
  for (let pokemon of pokemones) {

    if (nombreBuscado === "" || pokemon.nombre === nombreBuscado) {

      // Seleccionar el botón del Pokémon
      const botonDetalle = document.querySelector("#detalle-" + pokemon.id);

      // Agregar evento click
      botonDetalle.addEventListener("click", function() {

        mostrarDetallePokemon(pokemon.id);

      });

    }

  }

} // Cierra cargarPokedex



function escaparHTML(valor) {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Mostrar la información del Pokémon elegido.
function mostrarDetallePokemon(id) {
  const pokemones = leerPokemones();
  let seleccionado = null;

  // Buscamos el Pokémon por su número.
  for (let pokemon of pokemones) {
    if (pokemon.id === Number(id)) {
      seleccionado = pokemon;
      break;
    }
  }

  if (seleccionado === null) {
    app.innerHTML = "<p>El Pokémon seleccionado no existe.</p>";
    return;
  }

  const p = seleccionado;

  const evolucion = p.tieneEvolucion
    ? `${p.evolucion || "Sin nombre registrado"}${p.nivelEvolucion ? ` (nivel ${p.nivelEvolucion})` : ""}`
    : "No tiene evolución";

  // Construimos la pantalla con los datos del Pokémon.
  app.innerHTML = `
    <section class="detalle-pokemon">
      <button type="button" id="btn-volver-pokedex" class="btn-detalle">
        ← Volver a la Pokédex
      </button>

      <h1>${escaparHTML(p.nombre)} <small>N.º ${p.id}</small></h1>

      <img
        class="detalle-imagen"
        id="imagen-detalle"
        src="${escaparHTML(p.imagen)}"
        alt="${escaparHTML(p.nombre)}"
      />

      <p>${escaparHTML(p.descripcion || "Descripción todavía no cargada.")}</p>

      <div class="detalle-datos">
        <p><strong>Tipo:</strong> ${escaparHTML(p.tipo.join(" / "))}</p>
        <p><strong>Rareza:</strong> ${escaparHTML(p.rareza)}</p>
        <p><strong>Altura:</strong> ${p.altura} m</p>
        <p><strong>Peso:</strong> ${p.peso} kg</p>
        <p><strong>Generación:</strong> ${p.generacion}</p>
        <p><strong>HP:</strong> ${p.hp}</p>
        <p><strong>Ataque:</strong> ${p.ataque}</p>
        <p><strong>Defensa:</strong> ${p.defensa}</p>
        <p><strong>Velocidad:</strong> ${p.velocidad}</p>
        <p><strong>Habilidad:</strong> ${escaparHTML(p.habilidad)}</p>
        <p><strong>Evolución:</strong> ${escaparHTML(evolucion)}</p>
        <p><strong>Shiny:</strong> ${p.shiny ? "Sí" : "No"}</p>
      </div>

      ${p.sonido ? `
        <div class="detalle-audio">
          <h2>Sonido</h2>
          <audio controls src="${escaparHTML(p.sonido)}"></audio>
        </div>
      ` : ""}

      ${p.shiny && p.imagenShiny ? `
        <div class="detalle-shiny">
          <h2>Forma shiny</h2>
          <img
            id="imagen-shiny-detalle"
            src="${escaparHTML(p.imagenShiny)}"
            alt="Forma shiny de ${escaparHTML(p.nombre)}"
          />
        </div>
      ` : ""}
    </section>
  `;

  // Botón para volver a la Pokédex.
  document.querySelector("#btn-volver-pokedex")
    .addEventListener("click", function () {
      app.innerHTML = pokedex;
      cargarPokedex();
    });

  // Imagen alternativa si falla la imagen principal.
  document.querySelector("#imagen-detalle")
    .addEventListener("error", function (evento) {
      evento.target.src = "./assets/img/logo-pokemon.svg";
    }, { once: true });

  // Aviso si falta la imagen shiny.
  const imagenShiny = document.querySelector("#imagen-shiny-detalle");

  if (imagenShiny) {
    imagenShiny.addEventListener("error", function () {
      imagenShiny.replaceWith(
        document.createTextNode("Imagen shiny no disponible todavía.")
      );
    }, { once: true });
  }
}

// Evento del botón Pokédex
const botonPokedex = document.querySelector("#link-pokedex");


botonPokedex.addEventListener("click", function(event) {

  event.preventDefault();

  // Limpiar el buscador
  document.querySelector("#busqueda").value = "";

  // Mostrar la Pokédex completa
  app.innerHTML = pokedex;

  cargarPokedex();

});


// ==========================================
// BUSCADOR DE POKÉMON
// ==========================================

// Seleccionar el formulario
const formularioBusqueda = document.querySelector("#form-busqueda");

// Detectar el envío de la búsqueda
formularioBusqueda.addEventListener("submit", function(event) {

  // Evitar que la página se recargue
  event.preventDefault();

  // Capturar el nombre ingresado
  const nombreBuscado = document.querySelector("#busqueda").value;

  // Mostrar la pantalla Pokédex
  app.innerHTML = pokedex;

  // Cargar los resultados de la búsqueda
  cargarPokedex(nombreBuscado);

});

// ==========================================
// 3. INICIAR SESIÓN
// ==========================================

// Estructura básica de la pantalla
const login = `
  <section class="login-section">
          <h1>Iniciar sesión</h1>

          <form id="form-login">
            <label for="username"> Usuario </label>

            <input type="text" id="username" required />

            <label for="password"> Contraseña </label>

            <input type="password" id="password" required />
            <button type="submit">Ingresar</button>
            <p id="mensaje-login"></p>
          </form>
        </section>
`;

// Función para cargar los elementos dinámicos

function cargarLogin() {

  const formularioLogin = document.querySelector("#form-login");

  formularioLogin.addEventListener("submit", function(event) {

    event.preventDefault();

    // Capturar los datos del formulario
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Obtener usuarios registrados
    const usuarios = leerUsuarios();

    // Buscar al usuario
    for (let usuario of usuarios) {

      if (usuario.username === username && usuario.password === password) {

        // Guardar el usuario que inició sesión
        usuarioActivo = usuario;

        // Guardar su ID en localStorage
        localStorage.setItem(
          "usuarioActivoId",
          JSON.stringify(usuario.id)
        );

        console.log("Sesión iniciada correctamente");

        // Mostrar el perfil correspondiente
        mostrarPerfil();

        return;
      }

    }

    // Si no encontramos al usuario
    document.querySelector("#mensaje-login").innerHTML =
      "Usuario o contraseña incorrectos.";

  });

}

// Evento del botón Iniciar sesión

const botonLogin = document.querySelector("#link-login");

botonLogin.addEventListener("click", function(event) {

  event.preventDefault();

  app.innerHTML = login;

  cargarLogin();

});

// ==========================================
// 4. REGISTRO
// ==========================================

// Estructura básica de la pantalla
const registro = `
  <section class="registro-section">

    <h1>Registrarse</h1>

    <form id="form-registro">

      <label for="nombre">
        Nombre
      </label>

      <input
        type="text"
        id="nombre"
        required
        minlength="2"
        maxlength="60"
      />

      <label for="email">
        Email
      </label>

      <input
        type="email"
        id="email"
        required
      />

      <label for="nuevo-username">
        Usuario
      </label>

      <input
        type="text"
        id="nuevo-username"
        required
        minlength="3"
        maxlength="30"
      />

      <label for="nueva-password">
        Contraseña
      </label>

      <input
        type="password"
        id="nueva-password"
        required
        minlength="6"
      />

      <button type="submit">
        Registrarse
      </button>

      <p id="mensaje-registro"></p>

    </form>

  </section>
`;

// Función para cargar los elementos dinámicos

function cargarRegistro() {

  const formularioRegistro = document.querySelector("#form-registro");

  formularioRegistro.addEventListener("submit", function(event) {

    event.preventDefault();

    // 1. Capturar los datos del formulario
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const username = document.querySelector("#nuevo-username").value;
    const password = document.querySelector("#nueva-password").value;

    const mensaje = document.querySelector("#mensaje-registro");

    // 2. Comprobar que los campos no estén vacíos
    if (nombre === "" || email === "" || username === "" || password === "") {
      mensaje.innerHTML = "Completá todos los campos.";
      return;
    }

    // 3. Obtener los usuarios guardados
    const usuarios = leerUsuarios();

    // 4. Comprobar que el usuario no exista
    for (let usuario of usuarios) {

      if (usuario.username === username) {
        mensaje.innerHTML = "El nombre de usuario ya existe.";
        return;
      }

      if (usuario.email === email) {
        mensaje.innerHTML = "El email ya está registrado.";
        return;
      }

    }

    // 5. Calcular el ID del nuevo usuario
    let nuevoId = 1;

    for (let usuario of usuarios) {
      if (usuario.id >= nuevoId) {
        nuevoId = usuario.id + 1;
      }
    }

    // 6. Crear el objeto del nuevo usuario
    const nuevoUsuario = {
      id: nuevoId,
      nombre: nombre,
      email: email,
      username: username,
      password: password,
      avatar: "./assets/avatar/default.png",
      admin: false
    };

    // 7. Guardar el usuario
    guardarUsuarios(nuevoUsuario);

    mensaje.innerHTML = "Usuario registrado correctamente. Ya podés iniciar sesión.";

    // 8. Mostrar mensaje de confirmación
    mensaje.innerHTML = "Usuario registrado correctamente. Ya podés iniciar sesión.";

    console.log("Usuario registrado correctamente");

  });

}


// Evento del botón Registrarse
const botonRegistro = document.querySelector("#link-registro");

botonRegistro.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = registro;

  cargarRegistro();
});

// ==========================================
// 5. BATALLA
// ==========================================

// Estructura básica de la pantalla

const batalla = `
  <section class="batalla-section">

    <h1>Batalla Pokémon</h1>

    <p>Elegí tu Pokémon para comenzar.</p>

    <div class="batalla-acciones">

      <button id="btn-elegir-pikachu">
        Elegir Pikachu
      </button>

      <button id="btn-elegir-squirtle">
        Elegir Squirtle
      </button>

    </div>

  </section>
`;


// Función para cargar los elementos dinámicos

function cargarBatalla() {

  // Seleccionar los botones
  const botonPikachu = document.querySelector("#btn-elegir-pikachu");
  const botonSquirtle = document.querySelector("#btn-elegir-squirtle");

  // Elegir Pikachu
  botonPikachu.addEventListener("click", function() {
    comenzarBatalla("Pikachu");
  });

  // Elegir Squirtle
  botonSquirtle.addEventListener("click", function() {
    comenzarBatalla("Squirtle");
  });

}

// Función principal de la batalla
function comenzarBatalla(nombreJugador) {

  // Variables de la batalla
  let vidaJugador = 50;
  let vidaRival = 75;
  let pociones = 1;
  let turno = 1;
  let mensaje = "¡La batalla comenzó!";

  // Función que muestra el resultado final
  function mostrarResultado(resultado) {

    let titulo = "¡Derrota!";
    let descripcion = "Charmander ganó la batalla.";

    if (resultado === "victoria") {
      titulo = "¡Victoria!";
      descripcion = nombreJugador + " ganó la batalla.";
    }

    app.innerHTML = `
      <section class="batalla-section">

        <h1>${titulo}</h1>

        <p>${descripcion}</p>

        <p>La batalla terminó en el turno ${turno}.</p>

        <div class="batalla-acciones">

          <button id="btn-repetir-batalla">
            Volver a jugar
          </button>

          <button id="btn-inicio-batalla">
            Volver al inicio
          </button>

        </div>

      </section>
    `;

    // Volver a jugar
    const botonRepetir = document.querySelector("#btn-repetir-batalla");

    botonRepetir.addEventListener("click", function() {
      app.innerHTML = batalla;
      cargarBatalla();
    });

    // Volver al inicio
    const botonInicio = document.querySelector("#btn-inicio-batalla");

    botonInicio.addEventListener("click", function() {
      app.innerHTML = landing;
      cargarLanding();
    });

  }

  // Función que muestra cada turno
  function mostrarTurno() {

    app.innerHTML = `
      <section class="batalla-section">

        <h1>Batalla Pokémon</h1>

        <h2>Turno ${turno}</h2>

        <div class="batalla-pokemon">

          <div>
            <h3>${nombreJugador}</h3>
            <p>HP: ${vidaJugador}</p>
          </div>

          <div>
            <h3>Charmander</h3>
            <p>HP: ${vidaRival}</p>
          </div>

        </div>

        <p>${mensaje}</p>

        <h3>¿Qué querés hacer?</h3>

        <p>Pociones disponibles: ${pociones}</p>

        <div class="batalla-acciones">

          <button id="btn-atacar">
            Atacar
          </button>

          <button id="btn-usar-pocion">
            Usar poción
          </button>

        </div>

      </section>
    `;

    // ====================================
    // ACCIÓN: ATACAR
    // ====================================

    const botonAtacar = document.querySelector("#btn-atacar");

    botonAtacar.addEventListener("click", function() {

      // Nuestro Pokémon causa 25 de daño
      vidaRival = vidaRival - 25;

      // Comprobar si ganamos
      if (vidaRival <= 0) {
        mostrarResultado("victoria");
        return;
      }

      // Charmander contraataca
      vidaJugador = vidaJugador - 20;

      // Comprobar si perdimos
      if (vidaJugador <= 0) {
        mostrarResultado("derrota");
        return;
      }

      // Continuar con el siguiente turno
      mensaje = nombreJugador + " atacó a Charmander. Charmander contraatacó.";

      turno = turno + 1;

      mostrarTurno();

    });

    // ====================================
    // ACCIÓN: USAR POCIÓN
    // ====================================

    
const botonPocion = document.querySelector("#btn-usar-pocion");

botonPocion.addEventListener("click", function() {

  // Comprobar si quedan pociones
  if (pociones === 0) {

    mensaje = "No te quedan pociones.";

    mostrarTurno();

    return;
  }

  // Comprobar si ya tenemos la vida completa
  if (vidaJugador === 50) {

    mensaje = "Tu Pokémon ya tiene la vida completa.";

    mostrarTurno();

    return;
  }

  // Recuperar 20 puntos de vida
  vidaJugador = vidaJugador + 20;

  // No superar el máximo de 50 HP
  if (vidaJugador > 50) {
    vidaJugador = 50;
  }

  // Descontar una poción
  pociones = pociones - 1;

  // Mostrar mensaje
  mensaje = nombreJugador + " utilizó una poción y recuperó vida.";

  // Avanzar al siguiente turno
  turno = turno + 1;

  // Actualizar la pantalla
  mostrarTurno();

});


    botonPocion.addEventListener("click", function() {

      // Comprobar si quedan pociones
      if (pociones === 0) {

        mensaje = "No te quedan pociones.";

        mostrarTurno();

        return;
      }

      // Recuperar 20 puntos de vida
      vidaJugador = vidaJugador + 20;

      // No superar los 50 puntos de vida
      if (vidaJugador > 50) {
        vidaJugador = 50;
      }

      // Gastar una poción
      pociones = pociones - 1;

      // Charmander también ataca en este turno
      vidaJugador = vidaJugador - 20;

      // Comprobar si perdimos
      if (vidaJugador <= 0) {
        mostrarResultado("derrota");
        return;
      }

      // Continuar la batalla
      mensaje = nombreJugador + " usó una poción. Charmander atacó.";

      turno = turno + 1;

      mostrarTurno();

    });

  }

  // Mostrar el primer turno
  mostrarTurno();

}


// Evento del botón Batalla
const botonBatalla = document.querySelector("#link-juego");

botonBatalla.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = batalla;

  cargarBatalla();
});
// ==========================================
// 6. PERFIL USUARIO ESTANDAR
// ==========================================
function cargarPerfilEstandar() {
  console.log("Perfil de usuario estándar cargado");
}

const perfilEstandar = `
<section class="user-profile" id="user-profile">
          <h2>Perfil de usuario</h2>
          <div class="user-profile-info">
            <div>
              <img
                src="./assets/avatar/default.png"
                alt="Avatar de usuario"
                class="user-profile-avatar"
              />
            </div>
            <div>
              <p>
                Nombre de usuario:
                <span class="user-profile-username">Usuario</span>
              </p>
              <p>
                Email:
                <span class="user-profile-email">usuario@example.com</span>
              </p>
            </div>
          </div>
        </section>`;

// ==========================================
// 7. PERFIL USUARIO ADMIN
// ==========================================

function cargarPerfilAdmin() {

  const formularioNuevoPokemon = document.querySelector("#form-nuevo-pokemon");

  formularioNuevoPokemon.addEventListener("submit", function(event) {

    event.preventDefault();

    // Comprobar permisos del administrador
    if (usuarioActivo === null || usuarioActivo.admin === false) {
      console.log("No tenés permisos para agregar Pokémon");
      return;
    }

    // 1. Capturar los datos del formulario

    const numero = document.querySelector("#pokemon-number");
    const nombre = document.querySelector("#pokemon-name");
    const descripcion = document.querySelector("#pokemon-description");

    const tipo = document.querySelector("#pokemon-type");
    const segundoTipo = document.querySelector("#pokemon-second-type");

    const altura = document.querySelector("#pokemon-height");
    const peso = document.querySelector("#pokemon-weight");
    const generacion = document.querySelector("#pokemon-generation");

    const hp = document.querySelector("#pokemon-hp");
    const ataque = document.querySelector("#pokemon-attack");
    const velocidad = document.querySelector("#pokemon-speed");
    const defensa = document.querySelector("#pokemon-defense");

    const habilidad = document.querySelector("#pokemon-ability");

    const tieneEvolucion = document.querySelector(
      'input[name="pokemon-has-evolution"]:checked'
    );

    const evolucion = document.querySelector("#pokemon-evolution");
    const nivelEvolucion = document.querySelector("#pokemon-evolution-level");

    const rareza = document.querySelector("#pokemon-rarity");
    const imagen = document.querySelector("#pokemon-image");
    const sonido = document.querySelector("#pokemon-sound");

    const shiny = document.querySelector("#pokemon-shiny");
    const imagenShiny = document.querySelector("#pokemon-shiny-image");

    const mensaje = document.querySelector("#mensaje-nuevo-pokemon");

    // 2. Convertir el número del Pokémon
    const idPokemon = parseInt(numero.value);

    // 3. Validar valores numéricos
    if (
      idPokemon <= 0 ||
      altura.value * 1 <= 0 ||
      peso.value * 1 <= 0 ||
      generacion.value * 1 <= 0 ||
      hp.value * 1 <= 0 ||
      ataque.value * 1 <= 0 ||
      velocidad.value * 1 <= 0 ||
      defensa.value * 1 <= 0
    ) {
      mensaje.innerHTML = "Los valores numéricos deben ser mayores que cero.";
      return;
    }

    // 4. Obtener los Pokémon guardados
    const pokemones = leerPokemones();

    // 5. Comprobar que el número no esté repetido
    for (let pokemon of pokemones) {

      if (pokemon.id === idPokemon) {
        mensaje.innerHTML = "Ya existe un Pokémon con ese número.";
        return;
      }

    }

    // 6. Construir el array de tipos
    const tipos = [tipo.value];

    if (segundoTipo.value !== "") {
      tipos.push(segundoTipo.value);
    }

    // 7. Validar y guardar los datos de evolución
    let nombreEvolucion = null;
    let nivel = null;

    if (tieneEvolucion.value === "true") {

      if (evolucion.value === "") {
        mensaje.innerHTML = "Ingresá el nombre de la evolución.";
        return;
      }

      nombreEvolucion = evolucion.value;

      if (nivelEvolucion.value !== "") {
        nivel = parseInt(nivelEvolucion.value);

        if (nivel <= 0) {
          mensaje.innerHTML = "El nivel de evolución debe ser mayor que cero.";
          return;
        }
      }
    }

    // 8. Validar la imagen shiny
    let rutaShiny = null;

    if (shiny.checked === true) {

      if (imagenShiny.value === "") {
        mensaje.innerHTML = "Ingresá la imagen shiny.";
        return;
      }

      rutaShiny = imagenShiny.value;
    }

    // 9. Construir el objeto Pokémon
    const nuevoPokemon = {
      id: idPokemon,
      nombre: nombre.value,
      descripcion: descripcion.value,
      tipo: tipos,

      altura: altura.value * 1,
      peso: peso.value * 1,
      generacion: parseInt(generacion.value),

      hp: parseInt(hp.value),
      ataque: parseInt(ataque.value),
      velocidad: parseInt(velocidad.value),
      defensa: parseInt(defensa.value),

      habilidad: habilidad.value,

      tieneEvolucion: tieneEvolucion.value === "true",
      evolucion: nombreEvolucion,
      nivelEvolucion: nivel,

      rareza: rareza.value,
      imagen: imagen.value,
      sonido: sonido.value,

      shiny: shiny.checked,
      imagenShiny: rutaShiny
    };

    // 10. Guardar el Pokémon en localStorage
    guardarPokemones(nuevoPokemon);

    console.log("Nuevo Pokémon agregado:", nuevoPokemon);

    // 11. Mostrar confirmación
    mensaje.innerHTML = "Pokémon guardado correctamente.";

    // 12. Limpiar el formulario
    formularioNuevoPokemon.reset();

  });

}


const perfilAdmin = ` <section class="user-profile" id="user-profile">
          <h2>Perfil de usuario</h2>
          <div class="user-profile-info">
            <div>
              <img
                src="./assets/avatar/default.png"
                alt="Avatar de usuario"
                class="user-profile-avatar"
              />
            </div>
            <div>
              <p>
                Nombre de usuario:
                <span class="user-profile-username">Usuario</span>
              </p>
              <p>
                Email:
                <span class="user-profile-email">usuario@example.com</span>
              </p>
            </div>
          </div>
        </section>
        <section class="new-pokemon" id="new-pokemon">
          <h2>Nuevo Pokémon</h2>
          <form id="form-nuevo-pokemon">
            <label for="pokemon-number"> Numero en el Pokedex: </label>
            <input type="number" id="pokemon-number" required />

            <label for="pokemon-name">Nombre:</label>
            <input type="text" id="pokemon-name" required />

            <label for="pokemon-description">Descripción:</label>
            <textarea id="pokemon-description" rows="4" required></textarea>

            <label for="pokemon-type">Tipo:</label>
            <input type="text" id="pokemon-type" required />

            <label for="pokemon-second-type">Segundo tipo (opcional):</label>
            <input type="text" id="pokemon-second-type" />

            <label for="pokemon-height">Altura (m):</label>
            <input type="number" id="pokemon-height" step="0.1" required />

            <label for="pokemon-weight">Peso (kg):</label>
            <input type="number" id="pokemon-weight" step="0.1" required />

            <label for="pokemon-generation">Generación:</label>
            <input type="number" id="pokemon-generation" "min=1" required />

            <label for="pokemon-hp">HP:</label>
            <input type="number" id="pokemon-hp" "min=1" required />

            <label for="pokemon-attack">Ataque:</label>
            <input type="number" id="pokemon-attack" "min=1" required />

            <label for="pokemon-speed">Velocidad:</label>
            <input type="number" id="pokemon-speed" "min=1" required />

            <label for="pokemon-defense">Defensa:</label>
            <input type="number" id="pokemon-defense" "min=1" required />

            <label for="pokemon-ability">Habilidad:</label>
  
            <select id="pokemon-ability" required>
             <option value="" disabled selected>Seleccioná una habilidad</option>
              <option value="" disabled selected>Selecciona una habilidad</option>
              <option value="Adaptability">Adaptable</option>
              <option value="Battle Armor">Armadura batalla</option>
              <option value="Blaze">Mar llamas</option>
              <option value="Chlorophyll">Clorofila</option>
              <option value="Clear Body">Cuerpo puro</option>
              <option value="Color Change">Cambio color</option>
              <option value="Compound Eyes">Ojo compuesto</option>
              <option value="Cute Charm">Gran encanto</option>
              <option value="Early Bird"> madrugar</option>
              <option value="Effect Spore">Efecto espora</option>
              <option value="Flame Body">Cuerpo llama</option>
              <option value="Flash Fire">Absorbe fuego</option>
              <option value="Guts">Agallas</option>
              <option value="Huge Power">Potencia</option>
              <option value="Hustle">Entusiasmo</option>
              <option value="Hyper Cutter"> Corte fuerte</option>
              <option value="Illuminate"> iluminacion</option>
              <option value="Immunity">Inmunidad</option>
              <option value="Inner Focus">Foco interno</option>
              <option value="Intimidate">Intimidación</option>
              <option value="Keen Eye">Vista lince</option>
              <option value="Levitate">Levitación</option>
              <option value="Lightning Rod">Pararrayos</option>
              <option value="Limber">Flexibilidad</option>
              <option value="Liquid Ooze">Lodo líquido</option>
              <option value="Magic Guard">Muro mágico</option>
              <option value="Natural Cure">Cura natural</option>
              <option value="Oblivious">Despiste</option>
              <option value="Overgrow">Espesura</option>
              <option value="Own Tempo">Ritmo propio</option>
              <option value="Pickup">Recogida</option>
              <option value="Poison Point">Punto tóxico</option>
              <option value="Pressure">Presión</option>
              <option value="Run Away">Fuga</option>
              <option value="Serene Grace"> dicha</option>
              <option value="Shed Skin">Mudar</option>
              <option value="Shield Dust">Polvo escudo</option>
              <option value="Soundproof">Insonorizar</option>
              <option value="Static">Electricidad estática</option>
              <option value="Stench">Hedor</option>
              <option value="Sturdy">Robustez</option>
              <option value="Swarm">Enjambre</option>
              <option value="Swift Swim">N जल veloz</option>
              <option value="Synchronize"> sincronía</option>
              <option value="Thick Fat">Sebo</option>
              <option value="Torrent">Torrente</option>
              <option value="Trace">Rastro</option>
              <option value="Volt Absorb">Absorbe electricidad</option>
              <option value="Water Absorb">Absorbe agua</option>
              <option value="Wonder Guard">Superguarda</option>
            </select>

            <fieldset>
              <legend>¿Tiene evolución?</legend>
              <label for="  pokemon-has-evolution-yes">
                <input type="radio" id="pokemon-has-evolution-yes" name="pokemon-has-evolution" value="true" required />
                Sí
              </label>
              <label for="pokemon-has-evolution-no">
                <input type="radio" id="pokemon-has-evolution-no" name="pokemon-has-evolution" value="false" required />
                No
              </label>
            </fieldset>

            <label for="pokemon-evolution">Evolución:</label>
            <input type="text" id="pokemon-evolution" />

            <label for="pokemon-evolution-level">Nivel de evolución:</label>
            <input type="number" id="pokemon-evolution-level" />

            <label for="pokemon-rarity">Rareza:</label>
            <select id="pokemon-rarity" required>
              <option value="" disabled selected>Seleccioná una rareza</option>
              <option value="Común">Común</option>
              <option value="Raro">Raro</option>
              <option value="Legendario">Legendario</option>
              <option value="Mítico">Mítico</option>
              <option value="Singular">Singular</option>
            </select>

            <label for="pokemon-image">Imagen (URL):</label>
            <input type="text" id="pokemon-image" required />

            <label for="pokemon-sound">Sonido (URL):</label>
            <input type="text" id="pokemon-sound" required />

            <label for="pokemon-shiny">¿Es shiny?</label>
            <input type="checkbox" id="pokemon-shiny" />

            <label for="pokemon-shiny-image">Imagen shiny (URL):</label>
            <input type="text" id="pokemon-shiny-image" />

            <button type="submit">Agregar Pokémon</button>
            <p id="mensaje-nuevo-pokemon"></p>
          </form>
        </section>`;

function mostrarPerfil() {

  // Comprobar si hay un usuario conectado
  if (usuarioActivo === null) {

    app.innerHTML = login;
    cargarLogin();

    return;
  }

  // Mostrar el perfil según sus permisos
  if (usuarioActivo.admin === true) {

    app.innerHTML = perfilAdmin;

  } else {

    app.innerHTML = perfilEstandar;

  }

  // Agregar el botón de cierre de sesión
  document.querySelector("#user-profile").innerHTML += `
    <button type="button" id="btn-cerrar-sesion">
      Cerrar sesión
    </button>
  `;

  // Mostrar los datos del usuario
  document.querySelector(".user-profile-username").textContent =
    usuarioActivo.username;

  document.querySelector(".user-profile-email").textContent =
    usuarioActivo.email;

  document.querySelector(".user-profile-avatar").src =
    usuarioActivo.avatar;

  // Cargar las funciones del perfil
  if (usuarioActivo.admin === true) {

    cargarPerfilAdmin();

  } else {

    cargarPerfilEstandar();

  }

  // Evento para cerrar sesión
  const botonCerrar = document.querySelector("#btn-cerrar-sesion");

  botonCerrar.addEventListener("click", function() {

    usuarioActivo = null;

    localStorage.setItem(
      "usuarioActivoId",
      JSON.stringify(null)
    );

    app.innerHTML = landing;

    cargarLanding();

    console.log("Sesión cerrada correctamente");

  });

}

// ==========================================
// 8. LANDING INICIAL
// ==========================================

app.innerHTML = landing;

cargarLanding();

// ==========================================
// 7. PERFIL USUARIO ADMIN
// ==========================================

// Evento del enlace Mi perfil
const botonPerfil = document.querySelector("#link-perfil");

botonPerfil.addEventListener("click", function(event) {

  event.preventDefault();

  mostrarPerfil();

});

// Recuperar la pantalla del usuario conectado
if (usuarioActivo !== null) {

  mostrarPerfil();

}


