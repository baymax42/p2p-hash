import { FileDownloader } from './FileDownloader'
import { FileHost } from './FileHost'
import { MessageForwarder } from './MessageForwarder'
import { MessageReceiver } from './MessageReceiver'

export class NetworkFacade {
  private messageReceiver: MessageReceiver
  private messageForwarder: MessageForwarder

  private fileHost: FileHost | undefined
  private fileDownloader: FileDownloader | undefined

  private udpPort: number = 9000
  private tcpPort: number = 9090

  constructor () {
    this.messageForwarder = new MessageForwarder()
    this.messageReceiver = new MessageReceiver(this.udpPort)

    this.messageReceiver.start()
  }

  public send (address: string, content: any, resourceType: string): void {
    if (resourceType === 'message') {
      this.messageForwarder.forwardMessage(address, this.udpPort, content)
    } else if (resourceType === 'file') {
      if (!this.fileHost) {
        this.fileHost = new FileHost(this.tcpPort)
      }
      this.fileHost.hostFile(content)
    }
  }

  public broadcast (message: any): void {
    this.send('255.255.255.255', message, 'message')
  }

  public on (eventName: string, listener: (request: any) => void): NetworkFacade {
    this.messageReceiver.on(eventName, listener)
    return this
  }

  public downloadFile (address: string, listener: (data: any) => void) {
    if (!this.fileDownloader) {
      this.fileDownloader = new FileDownloader()
    }
    this.fileDownloader.on('completed', listener)
    this.fileDownloader.download(address, this.tcpPort)
  }

  public stop (resourceType: string) {
    if (resourceType === 'message') {
      this.messageReceiver.stop()
    } else if (resourceType === 'file' && this.fileHost) {
      this.fileHost.stop()
    }
  }
}
