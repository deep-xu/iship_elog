// Process entry point: build the app and start listening.
import { config } from './config/index.js'
import { createApp } from './app.js'

createApp().listen(config.port, () => {
  console.log(`NS5 API listening on http://localhost:${config.port}`)
})
