import { db_pool_connection } from "../db/db_conections.js";
import {
  response_error,
  response_not_found,
  response_success,
  reponse_created,
} from "../responses/responses.js";

export const selectNews = async (req,res) => {
  try {
    const [rows] = await db_pool_connection.query("SELECT * FROM noticias");
    console.log(rows);
    if (rows.length <= 0) {
      return res
        .status(404)
        .json(response_not_found("Noticias No Encontradas"));
    } else {
      res.status(200).json(response_success("Datos ok", rows));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al traer los datos de las noticias: " + error["sqlMessage"]
        )
      );
  }
};

export const selectNewsById = async (req,res) => {
  try {
    const {id} = req.body;
    const [rows] = await db_pool_connection.query(
      "SELECT * FROM noticias WHERE id= ?",
      [id]
    );
    console.log(rows);
    if (rows.length <= 0) {
      return res
        .status(404)
        .json(response_not_found("No se encontró ninguna noticia con ese id"));
    } else {
      res.status(200).json(response_success("Datos ok", rows));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        response_error(
          "Error al traer los datos de las noticias con ese id: " +
            error["sqlMessage"]
        )
      );
  }
};
