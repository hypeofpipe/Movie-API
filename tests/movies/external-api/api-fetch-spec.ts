import { expect } from "chai"
import "mocha"
import { ApiFetcher } from "../../../src/external-api/api-fetcher"

describe("tests an API fetcher", () => {
  const fetcher: ApiFetcher = new ApiFetcher()

  it("tests if an API fetcher builds url right", async () => {
    const uri = "http://www.omdbapi.com/?apikey=c1a1a6af&t=matrix&y=1993"
    const builtURI = await fetcher.query("Matrix", 1993)
    expect(builtURI).to.equal(uri)
  })

  it("tests if an API fetcher fetch the data", async () => {
    const matrix = `{"Title":"Matrix","Year":"1993–","Rated":"N/A","Released":"01 Mar 1993","Runtime":"60 min","Genre":"Action, Drama, Fantasy","Director":"N/A","Writer":"Grenville Case","Actors":"Nick Mancuso, Phillip Jarrett, Carrie-Anne Moss, John Vernon","Plot":"Steven Matrix is one of the underworld's foremost hitmen until his luck runs out, and someone puts a contract out on him. Shot in the forehead by a .22 pistol, Matrix \\"dies\\" and finds ...","Language":"English","Country":"Canada","Awards":"1 win.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYzUzOTA5ZTMtMTdlZS00MmQ5LWFmNjEtMjE5MTczN2RjNjE3XkEyXkFqcGdeQXVyNTc2ODIyMzY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.4/10"}],"Metascore":"N/A","imdbRating":"8.4","imdbVotes":"103","imdbID":"tt0106062","Type":"series","totalSeasons":"N/A","Response":"True"}`
    const result = await fetcher.fetch(await fetcher.query("Matrix", 1993))
    expect(matrix).to.eq(result)
  })
})
