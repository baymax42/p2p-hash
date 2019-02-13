import { Peer } from '.'
import { LOGGER } from '../utils'
import { PeerState } from './PeerState'
import { NetworkRegister } from '../network/NetworkRegister'

export class ElectionState extends PeerState {
  private hasFile: boolean

  private readonly CHANGE_STATE_ACTION = {
    callback: () => {
      const isFileInNetwork = Array.from(this.context.register.entries.values()).findIndex((v) => v.hasFile) !== -1
      if (!isFileInNetwork && !this.hasFile) {
        LOGGER.error('No file in network - aborting...')
        process.exit(0)
      } else if (this.context.register.elected === this.context.networkFacade.ip) {
        this.context.changeState('source')
      } else {
        this.context.changeState('destination')
      }
    },
    name: 'changeState',
    timeout: 5000
  }
  private readonly ELECTION_ACTION = {
    callback: () => {
      const message = {
        content: {
          hasFile: this.hasFile
        },
        type: 'election'
      }
      LOGGER.log(message)
      this.context.networkFacade.broadcast(message)
    },
    name: 'election',
    timeout: 1000
  }

  constructor (context: Peer) {
    super(context)
    this.hasFile = false
  }

  public queryNetworkMessageHandler (request: any): void {
    super.queryNetworkMessageHandler(request)
    this.context.actionManager.addTimedAction(this.CHANGE_STATE_ACTION)
  }

  public electionMessageHandler (request: any): void {
    super.electionMessageHandler(request)
    if (request.content) {
      this.elect(request)
      this.context.register.upsertEntry(request.remote.address, { hasFile: request.content.hasFile, hashIndex: null })
    }
  }

  public initialize (): void {
    this.context.actionManager.addCyclicAction(this.ELECTION_ACTION)
    this.context.actionManager.addTimedAction(this.CHANGE_STATE_ACTION)

    this.hasFile = this.context.hashManager.hashes.length > 0
    this.context.register.elected = this.hasFile ? this.context.networkFacade.ip : undefined
  }

  public toString (): string {
    return 'ELECTION'
  }

  private elect (request: any) {
    if (this.context.register.elected && request.content.hasFile) {
      this.context.register.elected = NetworkRegister.returnGreaterOrEqualAddress(this.context.register.elected, request.remote.address)
    } else if (request.content.hasFile) {
      this.context.register.elected = request.remote.address
    }
  }
}
