import { IPeerState, Peer } from '.'

export class IdleState implements IPeerState {
  private context: Peer

  constructor (context: Peer) {
    this.context = context
  }

  public queryNetworkMessageHandler (request: any): void {}

  public electionMessageHandler (request: any): void {}

  public workingOnMessageHandler (request: any): void {}

  public fetchFileMessageHandler (request: any): void {}

  public setupActions (): void {}

  public toString (): string {
    return 'IDLE'
  }
}
