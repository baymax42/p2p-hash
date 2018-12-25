import { LOGGER } from 'utils'
import { Peer } from '.'

export class NewbieState {
  private context: Peer

  constructor (context: Peer) {
    this.context = context
  }

  public loop (): void {
    const msg = {
      type: 'queryNetwork'
    }
    this.context.forwarder.forwardMessage('255.255.255.255', 9000, msg)
  }

  public queryNetworkHandler (request: any): void {
    LOGGER.log(`${request.remote.address} is in network`)
  }

  public aliveHandler (request: any): void {
    return
  }

  public electionHandler (request: any): void {
    return
  }

  public resultHandler (request: any): void {
    return
  }
}
