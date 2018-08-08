import * as request from "request-promise-native"
import { configuration } from "../../fetch.env"
import { URL } from "url"

export class ApiFetcher {
  async query(title: string, year?: number) {
    return new URL(
      `?apikey=${configuration.apiKey}&t=${title.toLowerCase()}&y=${year}`,
      `${configuration.baseUrl}`
    ).href
  }
  async fetch(uri: string) {
    return await request.get(uri)
  }
}
