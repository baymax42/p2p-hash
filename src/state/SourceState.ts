import { Peer } from '.'
import { PeerState } from './PeerState'

export class SourceState extends PeerState {
  private readonly CHANGE_STATE_ACTION = {
    callback: () => {
      this.context.changeState('worker')
    },
    name: 'workerState',
    timeout: 5000
  }

  constructor (context: Peer) {
    super(context)
  }

  public workingOnMessageHandler (request: any): void {
    super.workingOnMessageHandler(request)
    if (request.content) {
      this.context.register.upsertEntry(request.remote.address, { hasFile: null, hashIndex: request.content.hashIndex })
    }
  }

  public fetchFileMessageHandler (request: any): void {
    super.fetchFileMessageHandler(request)
    this.context.actionManager.addTimedAction(this.CHANGE_STATE_ACTION)
    this.context.networkFacade.send('', this.context.hashManager.file, 'file')
  }

  public initialize (): void {
    this.context.actionManager.addTimedAction(this.CHANGE_STATE_ACTION)
  }

  public toString (): string {
    return 'SOURCE'
  }
}
