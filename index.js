//Módulos
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes/router");

const app = express();


//Configuración y Middleware


app.set("port", 3000);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use("/api", router.router);

app.get("/", router.consultaPagina);

app.listen(app.get("port"), () => {console.log("Activo en el puerto:", app.get("port"))});
