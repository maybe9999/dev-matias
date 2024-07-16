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

document.addEventListener("DOMContentLoaded", () => {
    // Inicio slider proyectos
    const btnLeft = document.querySelector(".btn-left");
    const btnRight = document.querySelector(".btn-right");
    const slider = document.querySelector("#slider");
    const sliderSection = document.querySelectorAll(".slider-section");

    let operacion = 0;
    let counter = 0;
    let widthImg = 100 / sliderSection.length;

    btnLeft.addEventListener("click", e => moveToLeft())
    btnRight.addEventListener("click", e => moveToRight())

    setInterval(() => {
        moveToRight()
    }, 3000);


    function moveToRight() {
        if (counter >= sliderSection.length-1) {
            counter = 0;
            operacion = 0;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "none";
            return;
        } 
        counter++;
        operacion = operacion + widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s"
        
    }  

    function moveToLeft() {
        counter--;
        if (counter < 0 ) {
            counter = sliderSection.length-1;
            operacion = widthImg * (sliderSection.length-1)
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "none";
            return;
        } 
        operacion = operacion - widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s"
        
        
    }   
    // Fin slider proyectos
})