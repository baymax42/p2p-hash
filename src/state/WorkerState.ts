import { Peer } from '.'
import { PeerState } from './PeerState'
import { IHashEntry } from '../generator'
import { NetworkRegister } from '../network/NetworkRegister'

export class WorkerState extends PeerState {
  private takenHashes!: Set<number>
  private temporary!: boolean
  private currentHash: [number, IHashEntry] | undefined
  private readonly START_WORKING = {
    callback: () => {
      this.temporary = false
      // @ts-ignore
      this.context.hashManager.sendToWorker(this.currentHash[1], 3)
    },
    name: 'startWorking',
    timeout: 2000
  }

  public queryNetworkMessageHandler (request: any): void {
    if (this.context.networkFacade.ip === this.context.register.elected) {
      const message = {
        type: 'join',
        content: {
          network: {
            keys: this.context.register.entries.keys(),
            values: this.context.register.entries.values()
          }
        }
      }
      this.context.networkFacade.send(request.remote.address, message, 'message')
      this.context.hashManager.off('change', this.listener)
      this.context.changeState('source')
    }
  }

  constructor (context: Peer) {
    super(context)
  }

  public workingOnMessageHandler (request: any): void {
    if (this.temporary) {
      if (this.currentHash && request.content.hashIndex === this.currentHash[0]) {
        const address = NetworkRegister.returnGreaterOrEqualAddress(request.remote.address, this.context.networkFacade.ip)
        if (address !== this.context.networkFacade.ip) {
          this.context.register.upsertEntry(request.remote.address, {
            hasFile: null,
            hashIndex: request.content.hashIndex
          })
          this.nextHash()
        }
      }
    } else {
      this.context.register.upsertEntry(request.remote.address, { hasFile: null, hashIndex: request.content.hashIndex })
    }
  }

  public crackedMessageHandler (request: any): void {
    super.crackedMessageHandler(request)
    this.context.hashManager.update(request.content)
  }

  public initialize (): void {
    this.context.hashManager.on('change', this.listener)
    this.nextHash()
  }

  private readonly listener = () => this.changeHandler()

  public toString (): string {
    return 'WORKER'
  }

  private changeHandler () {
    if (this.currentHash && this.currentHash[1].plaintext !== '') {
      this.context.networkFacade.broadcast({
        type: 'cracked',
        content: this.currentHash[1]
      })
    }
    this.nextHash()
  }

  private nextHash (): void {
    if (!this.context.hashManager.isWorking) {
      this.takenHashes = new Set(Array.from(this.context.register.entries.values()).map((v) => v.hashIndex).filter((v) => v))
      this.currentHash = this.context.hashManager.getHash(Array.from(this.takenHashes))
      if (this.currentHash) {
        const message = {
          type: 'workingOn',
          content: {
            hashIndex: this.currentHash[0]
          }
        }
        this.temporary = true
        this.context.networkFacade.broadcast(message)
        this.context.actionManager.addTimedAction(this.START_WORKING)
      } else {
        this.context.hashManager.off('change', this.listener)
        this.context.changeState('idle')
      }
    }
  }
}
