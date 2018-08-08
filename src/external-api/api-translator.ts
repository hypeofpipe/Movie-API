import { Movie } from "../entity/Movie"

export class ApiTranslator {
  async translate(response: string) {
    const responseObject = await JSON.parse(response)
    const movie = new Movie()

    if (responseObject.Title && responseObject.Year && responseObject.Rated) {
      movie.title = responseObject.Title
      movie.year = parseInt(responseObject.Year)
      movie.rated = responseObject.Rated

      return movie
    }

    throw new Error(
      `Seems the object has no expected fields (title: ${
        responseObject.Title
      }, year: ${responseObject.Year}, rated: ${
        responseObject.Rated
      })! Please, review your query at ApiTranslator!`
    )
  }
}
