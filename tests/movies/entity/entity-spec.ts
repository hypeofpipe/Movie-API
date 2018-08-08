import { expect } from "chai"
import "mocha"
import { Connection } from "typeorm"
import { createConnection } from "typeorm"
import { Movie } from "../../../src/entity/Movie"
import { testDB } from "../../../db.env"

describe("Testing a movie entity", () => {
  let connection: Connection

  beforeEach(async () => {
    connection = await createConnection(testDB)
  })

  afterEach(async () => {
    await connection
      .getRepository(Movie.name)
      .query(`DROP TABLE if exists ${Movie.name} cascade`)

    connection.close()
  })

  it("testing if movie entity has been created saved and get from the DB as it should be", async () => {
    const movie: Movie = new Movie()

    movie.id = 1
    movie.title = "Bee Movie"
    movie.year = 2007
    movie.rated = "PG"

    await connection.getRepository(Movie).save(movie)

    const result = await connection
      .getRepository(Movie)
      .findOneOrFail({ id: 1 })

    expect(result).to.eql(movie)
  })
})
