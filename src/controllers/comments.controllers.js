import { db_pool_connection } from "../db/db_conections.js";
import {
  response_error,
  response_not_found,
  response_success,
  reponse_created,
} from "../responses/responses.js";

export const createReviewComment = async (req, res) => {
  try {
    const { comentario, fecha_comentario, usuario_id, resenia_id } = req.body;
    const [rows] = await db_pool_connection.query(
      "INSERT INTO comentarios_resenia(comentario,fecha_comentario,usuario_id,resenia_id) VALUES(?, ?, ?, ?)",
      [comentario, fecha_comentario, usuario_id, resenia_id]
    );
    console.log(rows);
    res
      .status(201)
      .json(reponse_created("Comentario Creado", rows, rows.insertId));
  } catch (error) {
    res
      .status(500)
      .json(
        response_error("Error al crear comentario: " + error["sqlMessage"])
      );
  }
};

export const getReviewComments = async (req, res) => {
  const {resenia_id}=req.body;
  try {
    const [rows] = await db_pool_connection.query(
      "SELECT * FROM comentarios_resenia WHERE resenia_id= ?",[resenia_id]
    );
    console.log(rows);
    if (rows.length <= 0) {
      return res
        .status(404)
        .json(response_not_found("Comentarios no encontrados"));
    } else {
      res.status(200).json(response_success("Datos ok", rows));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al traer los comentarios de la reseña: " + error["sqlMessage"]
        )
      );
  }
};

export const deleteReviewComment = async (req, res) => {
  try {
    const { id } = req.body;
    const [rows] = await db_pool_connection.query(
      "DELETE FROM comentarios_resenia WHERE  id= ?",
      [id]
    );
    if (rows.affectedRows > 0) {
      res
        .status(200)
        .json(response_success("Comentario eliminado exitosamente", req.body));
    } else {
      res
        .status(404)
        .json(
          response_not_found("El comentario a eliminar no ha sido encontrado")
        );
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al eliminar el comentario de la reseña con ese id: " +
            error["sqlMessage"]
        )
      );
  }
};
