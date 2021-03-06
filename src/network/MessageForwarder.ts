import dgram, { Socket } from 'dgram'
import { LOGGER } from 'utils'

// IPC class for sending messages
export class MessageForwarder {
  private client: Socket

  constructor () {
    // Create socket and enable broadcast flag
    this.client = dgram.createSocket('udp4')
    // We need to bind socket to random port and then set the flag
    this.client.bind(0, () => {
      this.client.setBroadcast(true)
    })
  }

  // Serialize and send message
  public forwardMessage (address: string, port: number, message: any): void {
    this.client.send(this.marshal(message), port, address, (err) => {
      if (err != null) {
        LOGGER.error(err)
      }
    })
  }

  // Serialize message to format accepted by IPC method
  private marshal (message: any): Buffer {
    return Buffer.from(JSON.stringify(message))
  }
}
