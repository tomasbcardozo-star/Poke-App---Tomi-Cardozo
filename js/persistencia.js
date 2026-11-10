// este archivo sirve para leer y trabajar con la base de datos
import { pokemones } from "./db/pokemones.js"

console.log(pokemones);

let pokemonesJson = JSON.stringify(pokemones);
localStorage.setItem("pokemones", pokemonesJson);
console.log("BD de pokemones no existe, se crea en local Storage");

if (bdPokemonesExiste === null) {
    let pokemonesJson = JSON.stringify(pokemones);
    localStorage.setItem("pokemones", pokemonesJson);
    console.log("BD de pokemones no existe, se crea en local storage")
    
    } else {
    let pokemonesBD = localStorage.getItem("pokemones");
    console.log("BD de pokemones existe en localstorage");
    }

    function leerPokemones() {
        let pokemonesJson = localStorage.getItem("pokemones");
        const pokemonesRead = JSON.parse(pokemonesJson);
        return pokemonesRead;
    }
    console.log(leerPokemones());
    