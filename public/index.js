// --- GENERAL ---
document.addEventListener("DOMContentLoaded", () => {
    // Obtener colores random
    console.log("se cargo el dom");
    const dados = document.getElementsByClassName("dados")[0];

    const rootStyles = document.documentElement.style;

    async function obtenerColores(pagina){
        return await fetch(`api/obtenerColores/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({page : pagina})
        }).then(response => response.json());
    }
/*
    const newPalettes = obtenerColores('https://colorhunt.co/palettes').then(colores => colores.newPalette || []);
    const trendyPalettes = obtenerColores('https://colorhunt.co/palettes/trendy').then(colores => colores.newPalette || []);
    const popularPalettes = obtenerColores('https://colorhunt.co/palettes/popular').then(colores => colores.newPalette || []);
    const randomPalettes = obtenerColores('https://colorhunt.co/palettes/random').then(colores => colores.newPalette || []);
*/
    let defaultPalettes = [
        ['#3DC2EC', '#4B70F5', '#4C3BCF', '#402E7A'],
        ['#F19ED2', '#E8C5E5', '#F7F9F2', '#91DDCF'],
        ['#E2BBE9', '#9B86BD', '#7776B3', '#5A639C'],
        ['#604CC3', '#80C4E9', '#FFF6E9', '#FF7F3E'], // 8 de 10
        ['#EE4E4E', '#FFC700', '#FFF455', '#219C90'],
        ['#0C1844', '#C80036', '#FF6969', '#FFF5E1'],
        ['#FFCBCB', '#FFB1B1', '#1679AB', '#102C57'],
        ['#F3FF90', '#9BEC00', '#06D001', '#059212'],
        ['#F1F8E8', '#55AD9B', '#95D2B3', '#D8EFD3'],
        ['#FD9B63', '#E7D37F', '#81A263', '#365E32'],
        ['#78ABA8', '#C8CFA0', '#FCDC94', '#EF9C66'],
        ['#F075AA', '#BC5A94', '#ADD899', '#FFDE95'],
        ['#000000', '#F6F6F6', '#22D4FD', '#272727'] //Origin
    ];
/*
    let uniendoPalettes = async () =>{
        const [newColorPalette, trendyColorPalette, popularColorPalette, randomColorPalette] = await Promise.all([
            newPalettes, trendyPalettes, popularPalettes, randomPalettes
        ]);

        defaultPalettes = defaultPalettes.concat(newColorPalette, trendyColorPalette, popularColorPalette, randomColorPalette);
        console.log("defaultPalettes", defaultPalettes);
    };

    uniendoPalettes();
*/
    function numRandom(num){
        return Math.floor(Math.random() * num);
    };

    function devuelvePalettaAleatoria(){
        return defaultPalettes[numRandom(defaultPalettes.length)];
    };

    function modificarPropiedadesRoot(propiedad, valor){
        rootStyles.setProperty(propiedad, valor);
    };

    dados.addEventListener("click", async () => {
        const color = devuelvePalettaAleatoria();
        modificarPropiedadesRoot("--color-primaria", color[0]);
        modificarPropiedadesRoot("--color-secundaria", color[1]);
        modificarPropiedadesRoot("--color-terciaria", color[2]);
        modificarPropiedadesRoot("--color-hover", color[3]);
        console.log(color);
    })
    // Fin Obtener colores random
})


//--- PROYECTOS... ---
document.addEventListener("proyectosLoaded", () => {
    console.log("se cargo el Dom de proyectos");
    const contenidoSlider = document.getElementsByClassName("presentacion__contenido__carruseles__slider-section");
    let contenidoSliderActivo; //Almacena el index de la lista donde esta el slide activo

    function actualizarSliderActivo() { //Obtiene el slider activo o visible
        for (let bucle = 0; bucle < contenidoSlider.length ; bucle++) {
            if (!contenidoSlider[bucle].classList.contains("hidden")) {
                contenidoSliderActivo = bucle;
                break; // Añadido para detener el bucle una vez se encuentra el activo
            }
        }
    }

    function moverALaIzquierda() {
        contenidoSlider[contenidoSliderActivo].classList.add("hidden");
        if (contenidoSliderActivo === 0) {
            contenidoSlider[contenidoSlider.length - 1].classList.remove("hidden");
            contenidoSliderActivo = contenidoSlider.length - 1; // Añadido para actualizar el slider activo
        } else {
            contenidoSlider[contenidoSliderActivo - 1].classList.remove("hidden");
            contenidoSliderActivo -= 1; // Añadido para actualizar el slider activo
        }
    }

    function moverALaDerecha() {
        contenidoSlider[contenidoSliderActivo].classList.add("hidden");
        if (contenidoSliderActivo === (contenidoSlider.length - 1)) { // Corregido para usar length - 1
            contenidoSlider[0].classList.remove("hidden");
            contenidoSliderActivo = 0; // Añadido para actualizar el slider activo
        } else {
            contenidoSlider[contenidoSliderActivo + 1].classList.remove("hidden");
            contenidoSliderActivo += 1; // Añadido para actualizar el slider activo
        }
    }

    actualizarSliderActivo();

    document.querySelector(".btn-left").addEventListener("click", moverALaIzquierda);
    document.querySelector(".btn-right").addEventListener("click", moverALaDerecha);

});
    


//HABILIDADES. TEXTO ICO
document.addEventListener("habilidadesLoaded", () => {
    const contenedores = document.querySelectorAll(".contenedor__ico");

    contenedores.forEach(contenedor => {
        const textoEtiqueta = contenedor.querySelector(".texto__etiqueta");

        contenedor.addEventListener("mouseout", () => {
            console.log("mouse fuera");
            textoEtiqueta.classList.add("hidden");
        });

        contenedor.addEventListener("mouseover", () => {
            console.log("mouse dentro");
            textoEtiqueta.classList.remove("hidden");
        });
    });
});


// ---  GENERAL !!! ---
document.addEventListener("DOMContentLoaded", ()=>{
    const menu = document.querySelector(".menu__hamburguesa");
    const itemsMenu = document.querySelector(".header__menu");
    const cierraMenu = document.querySelector(".cierra__menu");
    
    //Open menu
    menu.addEventListener("click", ()=>{
        menu.style.display = "none";
        itemsMenu.style.display = "flex";
        cierraMenu.style.display = "flex";
    })

    //Close menu
    cierraMenu.addEventListener("click", () =>{
        menu.style.display = "flex";
        itemsMenu.style.display = "none";
        cierraMenu.style.display = "none";
    })

})

document.addEventListener('DOMContentLoaded', function() {
    console.log(window.location.pathname.split("/").slice(-1)[0]);
    if (window.location.pathname.split("/").slice(-1)[0] === 'proyectos.html') {
        document.dispatchEvent(new Event('proyectosLoaded'));
        console.log("js de proyecto cargado");
    } else if (window.location.pathname.split("/").slice(-1)[0] === 'habilidades.html') {
        document.dispatchEvent(new Event('habilidadesLoaded'));
        console.log("js de habilidades cargado");
    }
});