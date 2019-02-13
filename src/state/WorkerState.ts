import { Peer } from '.'
import { PeerState } from './PeerState'

export class WorkerState extends PeerState {
  private readonly QUERY_ACTION = {
    callback: () => {
      const message = {
        type: 'workingOn'
      }
      this.context.networkFacade.broadcast(message)
    },
    name: 'workingOn',
    timeout: 1000
  }

  constructor (context: Peer) {
    super(context)
  }

  public queryNetworkMessageHandler (request: any): void {}

  public electionMessageHandler (request: any): void {}

  public workingOnMessageHandler (request: any): void {
    super.workingOnMessageHandler(request)
    if (request.content) {
      this.context.register.upsertEntry(request.remote.address, { hasFile: null, hash: request.content.hash })
    }
  }

  public fetchFileMessageHandler (request: any): void {
    super.fetchFileMessageHandler(request)
  }

  public initialize (): void {
    this.context.actionManager.addCyclicAction(this.QUERY_ACTION)
  }

  public toString (): string {
    return 'WORKER'
  }
}
