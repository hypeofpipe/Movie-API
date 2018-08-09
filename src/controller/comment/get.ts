import { Request, Response } from "express"
import { getConnection } from "../../../node_modules/typeorm"
import { get } from "../../service/comment/get"

export async function getAction(req: Request, res: Response) {
  await res.send(await get(getConnection()))
}
