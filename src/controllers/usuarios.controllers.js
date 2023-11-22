import { db_pool_connection } from "../db/db_conections.js";
import {
  response_error,
  response_not_found,
  response_success,
  reponse_created,
} from "../responses/responses.js";

export const seleccionarUsuario = async (req, res) => {
  try {
    const [rows] = await db_pool_connection.query('SELECT * FROM usuarios');
    console.log(rows);
    if (rows.length <= 0) {
      return res.status(404).json(response_not_found("Usuarios No Encontrado"));
    } else {
      res.status(200).json(response_success("Datos ok", rows));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al traer los datos de usuarios: " + error["sqlMessage"]
        )
      );
  }
};

export const seleccionarUsuariosByID = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db_pool_connection.query(
      'SELECT * FROM usuarios WHERE id= ?',
      [id]
    );
    console.log(rows);
    if (rows == null) {
      return res
        .status(404)
        .json(response_not_found("No se encontró ningun usuario con ese id"));
    } else {
      res.status(200).json(response_success("Datos ok", rows));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al traer los datos del usuario con ese id: " +
            error["sqlMessage"]
        )
      );
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombres, usuario, email, contrasena, genero } = req.body;
    const [rows] = await db_pool_connection.query(
      'INSERT INTO usuarios(nombres, usuario, email, contrasena, genero) VALUES(?, ?, ?, ?, ?)',
      [nombres, usuario, email, contrasena, genero]
    );
    console.log(rows);
    res
      .status(201)
      .json(reponse_created("Usuario Creado", rows, rows.insertId));
  } catch (error) {
    res
      .status(500)
      .json(response_error("Error al crear usuario: " + error["sqlMessage"]));
  }
};

export const actualizarUsuario = async (req,res) => {
  try {
    const { id, nombres, usuario, email, contrasena, genero } = req.body;
    const [rows] = await db_pool_connection.query(
      'UPDATE usuarios SET nombres= ?, usuario=?, email=?, contrasena=?, genero=? WHERE id= ?',
      [nombres, usuario, email, contrasena, genero, id]
    );
    console.log(rows);
    res
      .status(200)
      .json(response_success("Usuario actualizado existosamente", req.body));
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al actualizar los datos del usuario con ese id: " +
            error["sqlMessage"]
        )
      );
  }
};

export const eliminarUsuario = async (req,res) => {
  try {
    const { id } = req.body;
    const [rows] = await db_pool_connection.query(
      'DELETE FROM usuarios WHERE  id= ?',
      [id]
    );
    if (rows.affectedRows > 0) {
      res
        .status(200)
        .json(response_success("Usuario eliminado exitosamente", req.body));
    } else {
      res
        .status(404)
        .json(
          response_not_found("El usuario a eliminar no ha sido encontrado")
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al eliminar los datos del usuario con ese id: " +
            error["sqlMessage"]
        )
      );
  }
};
