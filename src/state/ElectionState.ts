import { Peer } from '.'
import { LOGGER } from '../utils'
import { PeerState } from './PeerState'

function returnGreaterOrEqualAddress (address1: string, address2: string): string {
  const addr1 = address1.split('.').reverse()
  const addr2 = address1.split('.').reverse()

  for (let i = 0; i < addr1.length; i++) {
    if (addr1[i] > addr2[i]) {
      return address1
    } else if (addr1[i] < addr2[i]) {
      return address2
    }
  }
  // if addresses are equal, return first
  return address1
}

export class ElectionState extends PeerState {
  private hasFile: boolean

  private readonly CHANGE_STATE_ACTION = {
    callback: () => {
      const isFileInNetwork = Array.from(this.context.register.entries.values()).findIndex((v) => v.hasFile) !== -1
      if (!isFileInNetwork && !this.hasFile) {
        LOGGER.error('No hasFile in network - aborting...')
        process.exit(1)
      } else if (this.context.elected === this.context.networkFacade.ip) {
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
      this.context.register.upsertEntry(request.remote.address, { hasFile: request.content.hasFile, hash: null })
    }
  }

  public initialize (): void {
    this.context.actionManager.addCyclicAction(this.ELECTION_ACTION)
    this.context.actionManager.addTimedAction(this.CHANGE_STATE_ACTION)

    this.hasFile = this.context.hashManager.hashes.length > 0
    this.context.elected = this.hasFile ? this.context.networkFacade.ip : undefined
  }

  public toString (): string {
    return 'ELECTION'
  }

  private elect (request: any) {
    if (this.context.elected && request.content.hasFile) {
      this.context.elected = returnGreaterOrEqualAddress(this.context.elected, request.remote.address)
    } else if (request.content.hasFile) {
      this.context.elected = request.remote.address
    }
  }
}
