import { LOGGER } from 'utils'
import { IPeerState, Peer } from './index'

export class ElectionState implements IPeerState {
  private context: Peer
  private isElected: boolean
  private readonly CHANGE_STATE_ACTION = {
    callback: () => {
      this.context.changeState('worker')
    },
    name: 'changeState',
    timeout: 5000
  }
  private readonly ELECTION_ACTION = {
    callback: () => {
      const message = {
        type: 'election'
      }
      this.context.forwarder.forwardMessage('255.255.255.255', 9000, message)
    },
    name: 'election',
    timeout: 1000
  }

  constructor (context: Peer) {
    this.context = context
    this.isElected = false
  }

  public aliveMessageHandler (request: any): void {
    LOGGER.format_log(request.remote.address, this.toString(), request.type)
  }

  public queryNetworkMessageHandler (request: any): void {
    this.context.actionManager.clearTimedAction(this.CHANGE_STATE_ACTION.name)
  }

  public electionMessageHandler (request: any): void {
    if(request.content) {
      this.context.register.upsertEntry(request.remote.address, {file: request.content.hasFile, hash: null})
    }
  }

  public workingOnMessageHandler (request: any): void {}

  public fetchFileMessageHandler (request: any): void {}

  public setupActions (): void {
    this.context.actionManager.addCyclicAction(
      this.ELECTION_ACTION.name,
      this.ELECTION_ACTION.callback,
      this.ELECTION_ACTION.timeout
    )
    this.context.actionManager.addTimedAction(
      this.CHANGE_STATE_ACTION.name,
      this.CHANGE_STATE_ACTION.callback,
      this.CHANGE_STATE_ACTION.timeout
    )
  }

  public toString (): string {
    return 'ELECTION'
  }
}
