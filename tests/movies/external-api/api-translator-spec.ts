import { expect } from "chai"
import "mocha"
import { ApiTranslator } from "../../../src/external-api/api-translator"
import { Movie } from "../../../src/entity/Movie"

describe("tests an API translator", () => {
  const translator: ApiTranslator = new ApiTranslator()

  it("tests if an API translator builds right entity from a response", async () => {
    const movie: Movie = new Movie()
    movie.title = "Matrix"
    movie.year = 1993
    movie.rated = "N/A"

    const response = `{"Title":"Matrix","Year":"1993–","Rated":"N/A","Released":"01 Mar 1993","Runtime":"60 min","Genre":"Action, Drama, Fantasy","Director":"N/A","Writer":"Grenville Case","Actors":"Nick Mancuso, Phillip Jarrett, Carrie-Anne Moss, John Vernon","Plot":"Steven Matrix is one of the underworld's foremost hitmen until his luck runs out, and someone puts a contract out on him. Shot in the forehead by a .22 pistol, Matrix \\"dies\\" and finds ...","Language":"English","Country":"Canada","Awards":"1 win.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYzUzOTA5ZTMtMTdlZS00MmQ5LWFmNjEtMjE5MTczN2RjNjE3XkEyXkFqcGdeQXVyNTc2ODIyMzY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.4/10"}],"Metascore":"N/A","imdbRating":"8.4","imdbVotes":"103","imdbID":"tt0106062","Type":"series","totalSeasons":"N/A","Response":"True"}`
    const builtEntity = await translator.translate(response)

    expect(builtEntity).to.eql(movie)
  })
})
