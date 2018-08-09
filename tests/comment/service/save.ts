import { expect } from "chai"
import "mocha"
import { Movie } from "../../../src/entity/Movie"
import { Comments } from "../../../src/entity/Comments"
import {
  getRepository,
  Connection,
  createConnection,
  getConnectionManager,
} from "../../../node_modules/typeorm"
import { testDB } from "../../../db.env"
import { save } from "../../../src/service/comment/save"

describe("tests save service at comments", async () => {
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

  it("tests if service save entity right", async () => {
    const movie1 = new Movie()
    movie1.title = "Matrix"
    movie1.rated = "N/A"
    movie1.year = 1993

    const comment1 = new Comments()
    comment1.author = "anonym"
    comment1.movie = movie1
    comment1.content =
      "Such an interesting movie! I really impressed by that movie and the fact, that in the date the movie released in Russia, I was 3 month years old baby!"

    await getRepository(Movie).save(movie1)

    const expectedEntity = Object.assign(
      await getRepository(Comments).save(comment1),
      { id: 2 }
    )

    const actualEntity = await save(connection, {
      author: "anonym",
      movie: 1,
      content:
        "Such an interesting movie! I really impressed by that movie and the fact, that in the date the movie released in Russia, I was 3 month years old baby!",
    })

    expect(expectedEntity).to.eql(actualEntity)
  })
})
