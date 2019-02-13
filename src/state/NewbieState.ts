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

  public initialize (): void {
    this.context.actionManager.addTimedAction(this.CHANGE_STATE_ACTION)
    this.context.actionManager.addCyclicAction(this.QUERY_ACTION)
  }

  public toString (): string {
    return 'NEWBIE'
  }
}
