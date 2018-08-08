import { Connection } from "../../../node_modules/typeorm"
import { Movie } from "../../entity/Movie"

export const save = async (connection: Connection, object: any) => {
  try {
    return await connection.getRepository(Movie).save(object)
  } catch (e) {
    console.log(e)
  }
}
