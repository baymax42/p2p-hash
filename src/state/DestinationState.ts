import { IPeerState, Peer } from '.'

export class DestinationState implements IPeerState {
  private context: Peer

  constructor (context: Peer) {
    this.context = context
  }

  public queryNetworkMessageHandler (request: any): void {}

  public electionMessageHandler (request: any): void {}

  public workingOnMessageHandler (request: any): void {
    if (request.content) {
      this.context.register.upsertEntry(request.remote.address, {file: null, hash: request.content.hash})
    }
  }

  public fetchFileMessageHandler (request: any): void {}

  public initialize (): void {}

  public toString (): string {
    return 'DESTINATION'
  }

}
