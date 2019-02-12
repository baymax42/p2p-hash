import { IPeerState, Peer } from '.'

export class SourceState implements IPeerState {
  private context: Peer
  private readonly CHANGE_STATE_ACTION = {
    callback: () => {
      this.context.changeState('worker')
    },
    name: 'workerState',
    timeout: 5000
  }
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

  public initialize (): void {
    this.context.actionManager.addTimedAction(
      this.CHANGE_STATE_ACTION.name,
      this.CHANGE_STATE_ACTION.callback,
      this.CHANGE_STATE_ACTION.timeout
    )
  }

  public toString (): string {
    return 'SOURCE'
  }
}
