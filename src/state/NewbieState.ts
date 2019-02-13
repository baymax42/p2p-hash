import { Peer } from '.'
import { PeerState } from './PeerState'

export class NewbieState extends PeerState {
  private readonly QUERY_ACTION = {
    callback: () => {
      const message = {
        type: 'queryNetwork'
      }
      this.context.networkFacade.broadcast(message)
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
    super(context)
  }

  public fetchFileMessageHandler (request: any): void {
    super.fetchFileMessageHandler(request)
    this.context.actionManager.addTimedAction(this.CHANGE_STATE_ACTION)
  }

  public workingOnMessageHandler (request: any): void {
    super.workingOnMessageHandler(request)
    this.context.actionManager.addTimedAction(this.CHANGE_STATE_ACTION)
  }

  public joinMessageHandler (request: any): void {
    super.joinMessageHandler(request)
    if (request.content) {
      const network = request.content.network
      this.context.register.elected = request.remote.address
      for (let i in network.keys) {
        this.context.register.upsertEntry(network.keys[i], network.values[i])
      }
      this.context.changeState('destination')
    }
  }

  public initialize (): void {
    this.context.actionManager.addTimedAction(this.CHANGE_STATE_ACTION)
    this.context.actionManager.addCyclicAction(this.QUERY_ACTION)
  }

  public toString (): string {
    return 'NEWBIE'
  }
}
