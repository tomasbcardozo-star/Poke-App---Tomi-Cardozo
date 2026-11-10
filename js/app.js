import { pokemones } from "./db/pokemones.js";
import { usuarios } from "./db/usuarios.js";

// ==========================================
// ELEMENTO PRINCIPAL DE LA APLICACIÓN
// ==========================================

const app = document.querySelector("#app");

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
function cargarPokedex() {
  const pokedexGallery = document.querySelector("#pokedex-gallery");

  for (let pokemon of pokemones) {
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

          <button class="btn-detalle" data-id="${pokemon.id}">
            Ver detalles
          </button>

        </div>

      </article>
    `;
  }
}

// Evento del botón Pokédex
const botonPokedex = document.querySelector("#link-pokedex");

botonPokedex.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = pokedex;

  cargarPokedex();
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
          </form>
        </section>
`;

// Función para cargar los elementos dinámicos
function cargarLogin() {
  console.log("Formulario de inicio de sesión cargado");
}

// Evento del botón Iniciar sesión
const botonLogin = document.querySelector("#link-login");

botonLogin.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = login;

  cargarLogin();

  const formularioLogin = document.querySelector("#form-login");

  formularioLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    let encontrado = false;
    for (let usuario of usuarios) {
      if (usuario.username === username && usuario.password === password) {
        encontrado = true;
        if (usuario.admin === true) {
          app.innerHTML = perfilAdmin;
          cargarPerfilAdmin();
        } else {
          app.innerHTML = perfilEstandar;
          cargarPerfilEstandar();
        }
        break;
      } else {
        encontrado = false;
      }
    }
    if (!encontrado) {
      document
        .querySelector("#form-login")
        .insertAdjacentHTML(
          "beforeend",
          `<p class="error-message">Usuario o contraseña incorrectos</p>`,
        );
    }
  });
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
      />

      <label for="email">
        Email
      </label>

      <input 
        type="email" 
        id="email"
      />

      <label for="nuevo-username">
        Usuario
      </label>

      <input 
        type="text" 
        id="nuevo-username"
      />

      <label for="nueva-password">
        Contraseña
      </label>

      <input 
        type="password" 
        id="nueva-password"
      />

      <button type="submit">
        Registrarse
      </button>

    </form>

  </section>
`;

// Función para cargar los elementos dinámicos
function cargarRegistro() {
  console.log("Formulario de registro cargado");
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

    <p>
      Elegí tu Pokémon para comenzar.
    </p>

    <button id="btn-comenzar-batalla">
      Comenzar batalla
    </button>

  </section>
`;

// Función para cargar los elementos dinámicos
function cargarBatalla() {
  console.log("Pantalla de batalla cargada");
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
  console.log("Perfil de usuario admin cargado");

  const formularioNuevoPokemon = document.querySelector("#form-nuevo-pokemon");

  formularioNuevoPokemon.addEventListener("submit", function (event) {
    event.preventDefault();

    const numero = document.querySelector("#pokemon-number");
    const nombre = document.querySelector("#pokemon-name");
    const tipo = document.querySelector("#pokemon-type");
    const imagen = document.querySelector("#pokemon-image");

    const nuevoPokemon = {
      id: numero.valueAsNumber,
      nombre: nombre.value,
      tipo: [tipo.value],
      imagen: imagen.value,
    };

    console.log("Nuevo Pokémon agregado:", nuevoPokemon);
    pokemones.push(nuevoPokemon);

    formularioNuevoPokemon.reset();
    numero.focus();
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

            <label for="pokemon-type">Tipo:</label>
            <input type="text" id="pokemon-type" required />

            <label for="pokemon-image">Imagen (URL):</label>
            <input type="text" id="pokemon-image" required />

            <button type="submit">Agregar Pokémon</button>
          </form>
        </section>`;

// ==========================================
// 8. LANDING INICIAL
// ==========================================

app.innerHTML = landing;

cargarLanding();

botonBatalla.addEventListener("click", function (event) {
  event.preventDefault();

  app.innerHTML = batalla;

  cargarBatalla();
});

// ==========================================
// 7. PERFIL USUARIO ADMIN
// ==========================================

// ==========================================
// 8. LANDING INICIAL
// ==========================================

app.innerHTML = landing;

cargarLanding();
