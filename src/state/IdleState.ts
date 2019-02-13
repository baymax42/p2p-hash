import { Peer } from '.'
import { PeerState } from './PeerState'

export class IdleState extends PeerState {
  constructor (context: Peer) {
    super(context)
  }

  public initialize (): void {
    const isElectedNode = this.context.register.elected === this.context.networkFacade.ip
    // Force update for website
    this.context.hashManager.update(this.context.hashManager.hashes[0])
    // Mark elected node as completed - remove info about file
    if (isElectedNode) {
      this.context.hashManager.hashes = []
      this.context.hashManager.file = ''
    } else {
      this.context.register.upsertEntry(this.context.register.elected || '', { hasFile: false, hash: null })
    }
    this.context.hashManager.hashes = []

    // Get next node with file
    this.context.register.elected = undefined
    for (const key of this.context.register.entries.keys()) {
      const value = this.context.register.getEntry(key) || { file: false }
      if (value.file === true) {
        this.context.register.elected = key
      }
    }
    // Change state depending on actual state of network
    if (this.context.register.elected && this.context.register.elected === this.context.networkFacade.ip) {
      this.context.changeState('source')
    } else if (this.context.register.elected) {
      this.context.changeState('destination')
    } else {
      this.context.changeState('election')
    }
  }

  public toString (): string {
    return 'IDLE'
  }
}
