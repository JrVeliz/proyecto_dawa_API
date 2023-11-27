import { db_pool_connection } from "../db/db_conections.js";
import {
  response_error,
  response_not_found,
  response_success,
  reponse_created,
  response_found
} from "../responses/responses.js";

export const seleccionarUsuarios = async (req, res) => {
  try {
    const [rows] = await db_pool_connection.query("SELECT * FROM usuarios");
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
    const {id} = req.body;
    const [rows] = await db_pool_connection.query(
      "SELECT * FROM usuarios WHERE id= ?",
      [id]
    );
    console.log(rows);
    if (rows.length<=0) {
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
    const { name, username, email, password, gender, urlImgPerfil } = req.body;
    const [rows] = await db_pool_connection.query(
      "INSERT INTO usuarios(name, username, email, password, gender, urlImgPerfil) VALUES(?, ?, ?, ?, ?,?)",
      [name, username, email, password, gender, urlImgPerfil]
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

export const actualizarUsuario = async (req, res) => {
  try {
    const { id, name, username, email, password, gender, urlImgPerfil } =
      req.body;
    console.log(
      "Valores que recibi desde el front: id: ?,name= ?, username=?, email=?, password=?, gender=?, urlImgPerfil=?",
      [id, name, username, email, password, gender, urlImgPerfil]
    );
    const [rows] = await db_pool_connection.query(
      "UPDATE usuarios SET name= ?, username=?, email=?, password=?, gender=?, urlImgPerfil=? WHERE id= ?",
      [name, username, email, password, gender, urlImgPerfil, id]
    );
    if (rows.affectedRows > 0) {
      res
        .status(200)
        .json(response_success("Usuario actualizado exitosamente", req.body));
    } else {
      res.status(500).json(response_error("Error al actualizar el registro"));
    }
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

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.body;
    const [rows] = await db_pool_connection.query(
      "DELETE FROM usuarios WHERE  id= ?",
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

export const validateLogin = async (req, res) => {
  const {username,password}=req.body;
  try {
    const [rows] = await db_pool_connection.query(
      "SELECT * FROM usuarios WHERE username= ? AND password= ?",
      [username, password]
    );
    if (rows.length <= 0) {
      return res
        .status(404)
        .json(
          response_not_found(
            "No se encontró ningun usuario registrado con esas credenciales"
          )
        );
    } else {
      console.log(rows);
      res.status(200).json(response_success("Datos ok", rows));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al buscar las credenciales: " + error["sqlMessage"]
        )
      );
  }
};


export const validateSignup = async (req, res) => {
  const {username,email}=req.body;
  try {
    const [rows] = await db_pool_connection.query(
      "SELECT * FROM usuarios WHERE username= ? OR email= ?",
      [username,email]
    );
    if (rows.length >0) {
      return res
        .status(200)
        .json(
          response_found(
            "Se encontró datos de la cuenta ya utilizados"
          )
        );
    } else {
      console.log(rows);
      res.status(404).json(response_not_found("No se encontraron los datos registrados"));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al buscar las credenciales: " + error["sqlMessage"]
        )
      );
  }
};
