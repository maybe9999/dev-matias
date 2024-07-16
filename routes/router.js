const express = require("express");
const path = require("path");
const scraper = require("../scraper/obtenerColores");

const router = express.Router();

const listIndex = {
    "" : path.resolve(__dirname, "../public/index.html"),
    "home" : path.resolve(__dirname, "../public/index.html"),
    "about" : path.resolve(__dirname, "../public/index.html"),
    "habilidades" : path.resolve(__dirname, "../public/index.html"),
    "notFound" : path.resolve(__dirname, ".public/notFound.html")
}

function obteniendo(req,res){
    const {page} = req.body;
    console.log("obteniendo...", page);
    scraper.obtenerColores(page).then(ok => {
        console.log("router", ok);
        res.json(ok);
    }).catch(error =>{
        console.log("router, esperando", error);
        res.json(error);
    })
}

//Api
router.put("/obtenerColores", obteniendo);

const consultaPagina = (req, res, next) => {
    let endPointActual = req.path.replace(/(\/)/gm,"");  
    if (endPointActual){
        res.sendFile(listIndex[endPointActual] || listIndex[""]);
    } else {
        next();
    };
};

module.exports = {
    router,
    consultaPagina
};