import { expect } from "chai"
import "mocha"
import { Movie } from "../../../src/entity/Movie"
import {
  getRepository,
  Connection,
  createConnection,
} from "../../../node_modules/typeorm"
import { testDB } from "../../../db.env"
import { get } from "../../../src/service/comment/get"
import { Comments } from "../../../src/entity/Comments"

describe("tests get service at comment", async () => {
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

  it("tests if service get entity right", async () => {
    const movie1 = new Movie()
    movie1.title = "Matrix"
    movie1.rated = "N/A"
    movie1.year = 1993

    const comment1 = new Comments()
    comment1.author = "anonym"
    comment1.movie = movie1
    comment1.content =
      "Such an interesting movie! I really impressed by that movie and the fact, that in the date the movie released in Russia, I was 3 month years old baby!"

    const comment2 = new Comments()
    comment2.author = "IDONTKNOW"
    comment2.movie = movie1
    comment2.content = "HEY! HOW ABOUT BEE MOVIE??!"

    await getRepository(Movie).save(movie1)

    const expectedEntity1 = await getRepository(Comments).save(comment1)
    const expectedEntity2 = await getRepository(Comments).save(comment2)

    const expectedEntities = [expectedEntity1, expectedEntity2]
    const actualEntities = await get(connection)

    actualEntities!.forEach(entity => {
      if (!entity) {
        throw new Error("Entity is undefined in comment get service test.")
      }
    })

    for (let i = 0; i < 2; i++) {
      expect(expectedEntities[i]).to.eql(actualEntities![i])
    }
  })
})
