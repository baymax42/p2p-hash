import { IPeerState, Peer } from './index'

export class WorkerState implements IPeerState {
  private context: Peer

  constructor (context: Peer) {
    this.context = context
  }

  public queryNetworkMessageHandler (request: any): void {}

  public electionMessageHandler (request: any): void {}

  public workingOnMessageHandler (request: any): void {
    if (request.content) {
      this.context.register.addEntry(request.remote.address, {file: null, hash:request.content.hash})
    }
  }

  public fetchFileMessageHandler (request: any): void {}

  public initialize (): void {
    return
  }

  public toString (): string {
    return 'WORKER'
  }
}
