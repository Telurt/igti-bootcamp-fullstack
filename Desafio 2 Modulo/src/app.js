import express from 'express'
import celebrate from 'celebrate'

import routes from './routes'

const { errors } = celebrate

class App {
  constructor() {
    this.server = express()

    this.server.use(express.json())

    this.routes()

    this.server.use(errors())
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
