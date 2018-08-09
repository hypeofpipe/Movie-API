import { Connection } from "../../../node_modules/typeorm"
import { Comments } from "../../entity/Comments"

export const get = async (connection: Connection) => {
  try {
    return await connection
      .getRepository(Comments)
      .find({ relations: ["movie"] })
  } catch (e) {
    console.log(e)
  }
}
