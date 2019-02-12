import * as fs from 'fs'
import * as net from 'net'
import { LOGGER } from '../utils'

export class FileHost {
  private server: net.Server | undefined
  private port: number

  constructor (port: number) {
    this.port = port
  }

  public hostFile (filename: string) {
    this.server = net.createServer((socket) => {
      fs.readFile(filename, (err, data) => {
        if (!err) {
          socket.write(data)
          socket.end()
        } else {
          LOGGER.error(err)
        }
      })
      socket.pipe(socket)
    })
    this.server.listen({ port: this.port })
  }

  public stop (): void {
    if (this.server) {
      this.server.close()
    }
  }
}
