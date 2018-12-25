import dgram, { Socket } from 'dgram'
import { LOGGER } from 'utils'
import { IRegistry } from './Registry'

// IPC class for sending messages
export class Forwarder {
  private client: Socket
  private registry: IRegistry

  constructor (reg: IRegistry) {
    // Create socket and enable broadcast flag
    this.client = dgram.createSocket('udp4')
    // We need to bind socket to random port and then set the flag
    this.client.bind(0, () => {
      this.client.setBroadcast(true)
    })
    this.registry = reg
  }

  // Serialize and send message
  public forwardMessage (id: string, port: number, message: any): void {
    const ip = this.registry.getIP(id)
    if (ip) {
      this.client.send(this.marshal(message), port, ip, (err) => {
        if (err != null) {
          LOGGER.error(err)
        }
      })
    }
  }

  // Serialize message to format accepted by IPC method
  private marshal (message: any): Buffer {
    return Buffer.from(JSON.stringify(message))
  }
}
