import { ConnectionOptions } from "typeorm"

export const testDB: ConnectionOptions = {
  type: "postgres",
  logging: ["error"],
  entities: ["src/entity/*.ts"],
  synchronize: true,
  host: "dumbo.db.elephantsql.com",
  port: 5432,
  database: "wxyjeueg",
  username: "wxyjeueg",
  password: "PLyDDARiON3cVMOX7vELBnXYKjnITLFj",
}
