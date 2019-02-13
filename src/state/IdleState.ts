import { Peer } from '.'
import { PeerState } from './PeerState'

export class IdleState extends PeerState {
  constructor (context: Peer) {
    super(context)
  }

  public queryNetworkMessageHandler (request: any): void {}

  public electionMessageHandler (request: any): void {}

  public workingOnMessageHandler (request: any): void {}

  public fetchFileMessageHandler (request: any): void {}

  public initialize (): void {}

  public toString (): string {
    return 'IDLE'
  }
}
