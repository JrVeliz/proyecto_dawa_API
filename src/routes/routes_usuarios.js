import { Router } from "express";
import {
  seleccionarUsuarios,
  seleccionarUsuariosByID,
  crearUsuario,
  actualizarUsuario,
  validateLogin,
  validateSignup
} from "../controllers/usuarios.controllers.js";

const routes_usuarios = new Router();
routes_usuarios.get("/usuarios", seleccionarUsuarios);

routes_usuarios.post("/usuarios", seleccionarUsuariosByID);

routes_usuarios.post("/login", validateLogin);

routes_usuarios.post("/signup/data",validateSignup);

routes_usuarios.post("/signup", crearUsuario);

routes_usuarios.post("/update", actualizarUsuario);

// routes_usuarios.delete('/usuarios',eliminarUsuario);

//get getID  post put delete
//obtener crear actualizar eliminar
export default routes_usuarios;
