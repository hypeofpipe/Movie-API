import { expect } from "chai"
import "mocha"
import { Movie } from "../../../src/entity/Movie"
import {
  getRepository,
  Connection,
  createConnection,
  getConnectionManager,
} from "../../../node_modules/typeorm"
import { testDB } from "../../../db.env"
import { save } from "../../../src/service/movies/save"

describe("tests save service at movies", async () => {
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

  it("tests if service save entity right", async () => {
    const movie = new Movie()
    movie.title = "Matrix"
    movie.rated = "N/A"
    movie.year = 1993

    const expectedEntity = Object.assign(
      await getRepository(Movie).save(movie),
      { id: 2 }
    )

    const actualEntity = await save(connection, {
      title: "Matrix",
      rated: "N/A",
      year: 1993,
    })

    expect(expectedEntity).to.eql(actualEntity)
  })
})
