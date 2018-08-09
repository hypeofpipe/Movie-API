import { Request, Response } from "express"
import { ApiFetcher } from "../../external-api/api-fetcher"
import { ApiTranslator } from "../../external-api/api-translator"
import { Movie } from "../../entity/Movie"
import {
  getConnectionManager,
  getConnection,
} from "../../../node_modules/typeorm"
import { save } from "../../service/movies/save"

export async function postAction(req: Request | any, res: Response) {
  if ((await !req.body.title) || (await !req.body.year)) {
    res.json({
      message: `Your title is ${req.body.title} and your year is ${
        req.body.year
      }, please, fill it, as in the example below`,
      title: "Matrix",
      year: 1993,
    })
    return
  }

  const fetcher: ApiFetcher = new ApiFetcher()
  const translator: ApiTranslator = new ApiTranslator()

  const film: Movie = await translator.translate(
    await fetcher.fetch(await fetcher.query(req.body.title, req.body.year))
  )
  ;(await save(getConnection(), film))
    ? res.send({ message: "Film has been successfully saved!" })
    : res.send({ message: "Something gone wrong!" })
}
