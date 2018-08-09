import { Request, Response } from "express"
import { ApiFetcher } from "../../external-api/api-fetcher"
import { ApiTranslator } from "../../external-api/api-translator"
import { Movie } from "../../entity/Movie"
import {
  getConnectionManager,
  getConnection,
} from "../../../node_modules/typeorm"
import { save } from "../../service/comment/save"
import { Comments } from "../../entity/Comments"

export async function postAction(req: Request | any, res: Response) {
  if (
    (await !req.body.author) ||
    (await !req.body.movieId) ||
    (await !req.body.content)
  ) {
    res.json({
      message: `Your author is ${req.body.author} and your movieId is ${
        req.body.movieId
      } and your content is ${
        req.body.content
      } please, fill it, as in the example below`,
      author: "anonym",
      movieId: 1,
      content: "blbalblalbalball",
    })
    return
  }

  ;(await save(getConnection(), {
    author: req.body.author,
    movieId: req.body.movieId,
    content: req.body.content,
  }))
    ? res.send({ message: "Comment has been successfully saved!" })
    : res.send({ message: "Something gone wrong!" })
}
