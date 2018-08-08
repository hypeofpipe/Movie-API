import { Request, Response } from "../../../node_modules/@types/request"
import { ApiFetcher } from "../../external-api/api-fetcher"
import { ApiTranslator } from "../../external-api/api-translator"
import { Movie } from "../../entity/Movie"
import { getConnectionManager } from "../../../node_modules/typeorm";

export async function post(req: Request | any, res: Response) {
  const fetcher: ApiFetcher = new ApiFetcher()
  const translator: ApiTranslator = new ApiTranslator()

  const film: Movie = await translator.translate(
    await fetcher.fetch(await fetcher.query(req.body.title, req.body.year))
  )

  await getConnectionManager().get().getRepository(Movie).save(film) ? res.body = {message: 'Film has been successfully saved!'}
}
