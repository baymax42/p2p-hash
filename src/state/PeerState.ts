import { LOGGER } from '../utils'
import { Peer } from './index'

export abstract class PeerState {
  protected context: Peer

  protected constructor (context: Peer) {
    this.context = context
  }

  public queryNetworkMessageHandler (request: any): void {
    LOGGER.format_log(
      this.context.networkFacade.ip,
      this.toString(),
      'QUERY NETWORK from ' + request.remote.address
    )
  }

  public electionMessageHandler (request: any): void {
    LOGGER.format_log(
      this.context.networkFacade.ip,
      this.toString(),
      'ELECTION from ' + request.remote.address
    )
  }

  public workingOnMessageHandler (request: any): void {
    LOGGER.format_log(
      this.context.networkFacade.ip,
      this.toString(),
      'WORKING ON from ' + request.remote.address
    )
  }

  public fetchFileMessageHandler (request: any): void {
    LOGGER.format_log(
      this.context.networkFacade.ip,
      this.toString(),
      'FETCH FILE from ' + request.remote.address
    )
  }

  public abstract initialize (): void

  public abstract toString (): string
}
