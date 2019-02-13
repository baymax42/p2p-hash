import { Peer } from '.'
import { PeerState } from './PeerState'
import { LOGGER } from '../utils'

export class DestinationState extends PeerState {
  private readonly QUERY_ACTION = {
    callback: () => {
      const message = {
        type: 'fetchFile'
      }
      this.context.networkFacade.broadcast(message)
    },
    name: 'fetchFile',
    timeout: 1000
  }
  constructor (context: Peer) {
    super(context)
  }

  public workingOnMessageHandler (request: any): void {
    super.workingOnMessageHandler(request)
    if (request.content) {
      this.context.register.upsertEntry(request.remote.address, { hasFile: null, hash: request.content.hash })
    }
  }

  public initialize (): void {
    this.context.actionManager.addCyclicAction(this.QUERY_ACTION)
    LOGGER.format_log(this.context.networkFacade.ip, 'ELECTED', this.context.elected)
    this.context.networkFacade.downloadFile(this.context.elected || '', (content) => {
      this.context.hashManager.parseFile(content)
      this.context.changeState('worker')
    })
  }

  public toString (): string {
    return 'DESTINATION'
  }

}
