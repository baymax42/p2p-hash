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

  public electionMessageHandler (request: any): void {
    LOGGER.format_log(request.remote.address, this.toString(), request.type)
    if (this.context.network.indexOf(request.remote.address) === -1) {
      this.context.network.push(request.remote.address)
      // Reset timer for changing state
      this.context.actionManager.clearTimedAction('changeState')
      this.context.actionManager.addTimedAction(
        this.CHANGE_STATE_ACTION.name,
        this.CHANGE_STATE_ACTION.callback,
        this.CHANGE_STATE_ACTION.timeout
      )
      LOGGER.format_log(request.remote.address, this.toString(), request.type)
    }
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
