import dgram, { Socket } from 'dgram'
import { EventEmitter } from 'events'
import * as os from 'os'
import { LOGGER } from 'utils'

// IPC class for receiving and processing messages from peers
export class MessageReceiver extends EventEmitter {
  private server: Socket
  private ips: string[]

  constructor (port: number) {
    super()
    this.ips = this.getIpAddresses()
    this.server = dgram.createSocket('udp4')
    this.server.bind(port)
  }

  // Start receiver and register event handlers
  public start (): void {
    this.server.on('listening', () => {
      LOGGER.log('Peer listening...')
    })

    this.server.on('message', (msg, info) => {
      // Ignore message if it comes from itself
      if (this.ips.find((v) => v === info.address) == null) {
        this.emitMessage(this.unmarshal(msg), info)
      }
    })

    this.server.on('error', (err) => {
      LOGGER.error(`Error occurred ${err}`)
    })
  }

  // Stop receiver and remove all handlers
  public stop (): void {
    this.server.removeAllListeners()
  }

  // Emit custom event based on message type
  private emitMessage (content: any, remote: any): void {
    // and validate if sent data is correct
    // TODO: Might need more strict validation depending on message type
    if ('type' in content) {
      // Pass the information about the remote
      content.remote = remote
      // Emit event based on message type
      this.emit(content.type, content)
    }
  }

  // Get public ip addresses of the machine
  private getIpAddresses (): string[] {
    const interfaces = os.networkInterfaces()
    const ips = Object.keys(interfaces).map((ifname) => {
      const result: string[] = []
      interfaces[ifname].forEach((value) => {
        if (value.family === 'IPv4' && value.internal === false) {
          result.push(value.address)
        }
      })
      return result
    }) as string[][]
    return ([] as string[]).concat(...ips)
  }

  // Deserialize received data from IPC
  private unmarshal (data: Buffer): JSON {
    return JSON.parse(data.toString())
  }
}
