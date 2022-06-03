import path from 'path'
import express from 'express'
import config from './config'
import fs from 'fs'
import http from 'http'
import https, { ServerOptions } from 'https'
import { AddressInfo } from 'net'
import { Server } from 'socket.io'
const app = express()
const options: ServerOptions = {}
console.log(config)

if (config.secure) {
  options.key = fs.readFileSync('sis-key.pem')
  options.cert = fs.readFileSync('sis-cert.pem')
}
const server = config.secure ? https.createServer(options, app) : new http.Server(app)
const io = config.secure ? new Server(server) : new Server(server)

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', socket => {
  console.log('socket.id =', socket.id)
})

server.listen(3000, () => {
  const address = server.address()
  const port = typeof address === 'string' ? null : (address as AddressInfo).port
  const string = String(port)
  console.log(`listening on port: ${string}`)
})
