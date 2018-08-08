import { expect } from "chai"
import "mocha"
import { Movie } from "../../../src/entity/Movie"
import {
  getRepository,
  Connection,
  createConnection,
} from "../../../node_modules/typeorm"
import { testDB } from "../../../db.env"
import { get } from "../../../src/service/movies/get"

describe("tests get service at movies", async () => {
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
    const movie1 = new Movie()
    movie1.title = "Matrix"
    movie1.rated = "N/A"
    movie1.year = 1993

    const movie2 = new Movie()
    movie2.title = "Inception"
    movie2.rated = "PG-13"
    movie2.year = 2010

    const expectedEntity1 = await getRepository(Movie).save(movie1)
    const expectedEntity2 = await getRepository(Movie).save(movie2)

    const expectedEntities = [expectedEntity1, expectedEntity2]
    const actualEntities = await get(connection)

    actualEntities!.forEach(entity => {
      if (!entity) {
        throw new Error("Entity is undefined in movie get service test.")
      }
    })

    for (let i = 0; i < 2; i++) {
      expect(expectedEntities[i]).to.eql(actualEntities![i])
    }
  })
})
