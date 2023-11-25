import express from "express";
import { PORT, config_core } from "./config/config.js";
import routes_usuarios from "./routes/routes_usuarios.js";
import routes_topjuegos from "./routes/routes_topjuegos.js";
import routes_reviews from "./routes/routes_reviews.js";
import routes_news from "./routes/routes_news.js";
import routes_comments from "./routes/routes_comments.js"
import cors from "cors";
//Crea la app
const app = express();

//definir politicas de mi core para el acceso al API
app.use(cors(config_core.application.cors.server));

//configura para que el response, osea las solicitudes se manejen con jsons
app.use(express.json());

//configura lo que se hara si se van a esas rutas
app.use(routes_usuarios);
app.use(routes_news);
app.use(routes_reviews);
app.use(routes_topjuegos);
app.use(routes_comments);

//middleware para rutas no deseadas
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta Inválida" });
});

//levanta el servidor
app.listen(PORT);

console.log("Soy el API en el puerto:" + PORT);
