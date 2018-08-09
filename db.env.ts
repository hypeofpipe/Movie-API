import { ConnectionOptions } from "typeorm"

export const testDB: ConnectionOptions = {
  type: "your_db_type",
  logging: ["error"],
  entities: ["src/entity/*.ts"],
  synchronize: true,
  host: "your_host",
  port: your_port,
  database: "your_db",
  username: "your_username",
  password: "your_password",
}

export const prodDB: ConnectionOptions = {
  type: "your_db_type",
  logging: ["error"],
  entities: ["src/entity/*.ts"],
  synchronize: true,
  host: "your_host",
  port: your_port,
  database: "your_db",
  username: "your_username",
  password: "your_password",
}
