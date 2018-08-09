import "reflect-metadata"
import { createConnection } from "typeorm"
import express, { Request, Response } from "express"
import * as bodyParser from "body-parser"
import { AppRoutes } from "./routes"
import { prodDB } from "../db.env"
import { error } from "util"

createConnection(prodDB)
  .then(async connection => {
    const app: any = express()
    const port = process.env.PORT || 3000
    app.use(bodyParser.json())

    AppRoutes.forEach(route => {
      app[route.method](
        route.path,
        (
          request: Request | any,
          response: Response | any,
          next: Function | any
        ) => {
          route
            .action(request, response)
            .then(() => next)
            .catch(error => next(error))
        }
      )
    })

    app.listen(port, () => {
      console.log(`The app started on ${port}!`)
    })
  })
  .catch(error => console.log(error))
