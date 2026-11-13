// Módulo de batalla de PokeApp.
// Toda la lógica, las pantallas y los eventos del juego están en este archivo.
// Recibimos el inicio y su función para poder volver sin duplicar el HTML.

export function iniciarJuego(landing, cargarLanding) {
  const app = document.querySelector("#app");

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
}
