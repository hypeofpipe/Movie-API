import { expect } from "chai"
import "mocha"
import { Connection } from "typeorm"
import { createConnection } from "typeorm"
import { Movie } from "../../../src/entity/Movie";

describe("Testing an movie entity", () => {
  let connection: Connection

  beforeEach(async () => {
    connection = await createConnection({
      type: "sqljs",
      entities: [Movie],
      logging: false,
      dropSchema: true,
      synchronize: true
    })
  })

  afterEach(async () => {
    await connection.close()
  })

  it("testing if entity has been created and stored well", async () => {
    
    const movie: Movie = new Movie()
   
    movie.id = 1
    movie.title = 'Bee Movie'
    movie.year = 2007
    movie.rated = 'PG'
    movie.released = "02 Nov 2007"

    await connection.getRepository(Movie).save(movie)
    
    const result = await connection.getRepository(Movie).findOneOrFail(1)

    expect(result).to.equal(movie)
  })
})
