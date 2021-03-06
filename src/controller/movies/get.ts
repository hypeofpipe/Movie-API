import { Request, Response } from "express"
import {
  getConnectionManager,
  getRepository,
  getConnection,
} from "../../../node_modules/typeorm"
import { get } from "../../service/movies/get"

export async function getAction(req: Request, res: Response) {
  await res.send(await get(getConnection()))
}
