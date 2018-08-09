import { Connection } from "../../../node_modules/typeorm"
import { Comments } from "../../entity/Comments"
import { Movie } from "../../entity/Movie"

export const save = async (connection: Connection, object: any) => {
  try {
    object.movie = await connection
      .getRepository(Movie)
      .findOneOrFail(object.movie)
    return await connection.getRepository(Comments).save(object)
  } catch (e) {
    console.log(e)
  }
}
