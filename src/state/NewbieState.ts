import { IPeerState, Peer } from '.'

export class NewbieState implements IPeerState {
  private context: Peer
  private readonly QUERY_ACTION = {
    callback: () => {
      const message = {
        type: 'queryNetwork'
      }
      this.context.forwarder.forwardMessage('255.255.255.255', 9000, message)
    },
    name: 'query',
    timeout: 1000
  }
  private readonly CHANGE_STATE_ACTION = {
    callback: () => {
      this.context.changeState('election')
    },
    name: 'electionState',
    timeout: 5000
  }

  constructor (context: Peer) {
    this.context = context
  }

  public queryNetworkMessageHandler (request: any): void {}

  public electionMessageHandler (request: any): void {}

  public workingOnMessageHandler (request: any): void {}

  public fetchFileMessageHandler (request: any): void {}

  public setupActions (): void {
    this.context.actionManager.addTimedAction(
      this.CHANGE_STATE_ACTION.name,
      this.CHANGE_STATE_ACTION.callback,
      this.CHANGE_STATE_ACTION.timeout
    )
    this.context.actionManager.addCyclicAction(
      this.QUERY_ACTION.name,
      this.QUERY_ACTION.callback,
      this.QUERY_ACTION.timeout
    )
  }

  public toString (): string {
    return 'NEWBIE'
  }
}
