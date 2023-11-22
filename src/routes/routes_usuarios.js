import { Router } from "express";
import {seleccionarUsuario,seleccionarUsuariosByID,crearUsuario,actualizarUsuario,eliminarUsuario} from "../controllers/usuarios.controllers.js";
import { response_not_found } from "../responses/responses.js";

const routes_usuarios = new Router();
routes_usuarios.get('/usuarios',seleccionarUsuario);

routes_usuarios.get('/usuarios/:id',seleccionarUsuariosByID);

routes_usuarios.post('/usuarios',crearUsuario);

routes_usuarios.put('/usuarios/:id',actualizarUsuario);

routes_usuarios.delete('/usuarios',eliminarUsuario);

//get getID  post put delete
//obtener crear actualizar eliminar
export default routes_usuarios;