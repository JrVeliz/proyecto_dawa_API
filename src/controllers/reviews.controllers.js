import { db_pool_connection } from "../db/db_conections.js";
import {
  response_error,
  response_not_found,
  response_success,
  reponse_created,
} from "../responses/responses.js";

export const selectReviews = async (req,res) => {
  try {
    const [rows] = await db_pool_connection.query("SELECT * FROM resenias");
    console.log(rows);
    if (rows.length <= 0) {
      return res.status(404).json(response_not_found("Reviews No Encontrado"));
    } else {
      res.status(200).json(response_success("Datos ok", rows));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al traer los datos de las reviews: " + error["sqlMessage"]
        )
      );
  }
};

export const selectReviewsByID = async (req,res) => {
  try {
    const {id} = req.body;
    const [rows] = await db_pool_connection.query(
      "SELECT * FROM resenias WHERE id= ?",
      [id]
    );
    console.log(rows);
    if (rows.length <= 0) {
      return res
        .status(404)
        .json(response_not_found("No se encontró ninguna reseñas con ese id"));
    } else {
      res.status(200).json(response_success("Datos ok", rows));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al traer los datos de la reseña con ese id: " +
            error["sqlMessage"]
        )
      );
  }
};
