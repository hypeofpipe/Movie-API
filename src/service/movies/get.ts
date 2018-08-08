import { Connection } from "../../../node_modules/typeorm"
import { Movie } from "../../entity/Movie"

export const get = async (connection: Connection) => {
  try {
    return await connection.getRepository(Movie).find()
  } catch (e) {
    console.log(e)
  }
}
