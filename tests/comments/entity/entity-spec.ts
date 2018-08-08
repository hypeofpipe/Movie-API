import { expect } from "chai"
import "mocha"
import { Connection, getConnectionManager } from "typeorm"
import { createConnection } from "typeorm"
import { Comments } from "../../../src/entity/Comments"
import { Movie } from "../../../src/entity/Movie"
import { testDB } from "../../../db.env"

describe("tests a comment entity", async () => {
  let connection: Connection

  beforeEach(async () => {
    connection = await createConnection(testDB)
  })

  afterEach(async () => {
    ;[Movie, Comments].forEach(async schema => {
      await connection
        .getRepository(schema.name)
        .query(`DROP TABLE if exists ${schema.name} cascade`)
    })
    await connection.close()
  })

  it("testing if comments entity has been created with relation of movie entity saved and get from the DB as it should be", async () => {
    const comments: Comments = new Comments()
    const movie: Movie = new Movie()

    movie.title = "Bee Movie"
    movie.year = 2007
    movie.rated = "PG"

    await connection.getRepository(Movie).save(movie)

    comments.id = 1
    comments.author = "Testosteron"
    comments.movie = movie
    comments.content = "I was really impressed by this movie!"

    await connection.getRepository(Comments).save(comments)

    const result = await connection
      .getRepository(Comments)
      .findOneOrFail({ id: 1 }, { relations: ["movie"] })

    expect(result).to.eql(comments)
  })
})
