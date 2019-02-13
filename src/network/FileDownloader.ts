import { EventEmitter } from 'events'
import * as fs from 'fs'
import * as net from 'net'
import { LOGGER } from 'utils'
import { randomBytes } from 'crypto'
import * as path from 'path'

export class FileDownloader extends EventEmitter {
  private chunks: Buffer[]

  constructor () {
    super()
    this.chunks = []
  }

  public download (host: string, port: number): void {
    const client = net.createConnection({ host, port, timeout: 1000 })
    // data might be transferred in chunks, so we save every chunk and then merge them
    client.on('data', (chunk) => {
      this.chunks.push(chunk)
    })

    // if file downloading ends save file and emit content
    client.on('end', () => {
      const content = Buffer.concat(this.chunks)
      const filename = path.resolve('/', randomBytes(16).toString('hex'))
      fs.writeFile(filename, content, {
        encoding: 'UTF-8',
        flag: 'w'
      }, (error) => {
        if (error) {
          LOGGER.format_log(client.localAddress, 'FILE SAVING ERROR', error.message)
        }
      })
      LOGGER.format_log(client.localAddress, 'DOWNLOAD SUCCEED', '')
      this.emit('completed', content.toString())
    })

    client.on('error', (error) => {
      LOGGER.format_log(client.localAddress, 'DOWNLOAD ERROR', error.message)
      client.end()
      setTimeout(() => this.download(host, port), 1000)
    })
  }
}
