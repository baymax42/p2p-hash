import { LOGGER } from 'utils'
import { Peer } from '.'
import { __BROADCAST__ } from '../network/Registry'

export class NewbieState {
  private context: Peer

  constructor (context: Peer) {
    this.context = context
  }

  public setupCyclicActions (): void {
    this.context.addCyclicAction('query', () => {
      const message = {
        type: 'queryNetwork'
      }
      LOGGER.log(message)
      this.context.forwarder.forwardMessage(__BROADCAST__, 9000, message)
    }, 1000)
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
