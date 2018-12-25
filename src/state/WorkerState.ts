import { LOGGER } from 'utils'
import { IPeerState, Peer } from './index'

export class WorkerState implements IPeerState {
  private context: Peer

  constructor (context: Peer) {
    this.context = context
  }

  public aliveMessageHandler (request: any): void {
    LOGGER.format_log(request.remote.address, this.toString(), request.type)
  }

  public electionMessageHandler (request: any): void {
    LOGGER.format_log(request.remote.address, this.toString(), request.type)
  }

  public networkMessageHandler (request: any): void {
    LOGGER.format_log(request.remote.address, this.toString(), request.type)
  }

  public queryNetworkMessageHandler (request: any): void {
    LOGGER.format_log(request.remote.address, this.toString(), request.type)
  }

  public resultMessageHandler (request: any): void {
    LOGGER.format_log(request.remote.address, this.toString(), request.type)
  }

  public setupActions (): void {
    return
  }

  public toString (): string {
    return 'WORKER'
  }
}
