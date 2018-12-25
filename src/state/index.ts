import { Forwarder, Receiver } from '../communication'
import { NewbieState } from './NewbieState'

export interface IPeerState {
  loop (): void

  queryNetworkHandler (request: object): void
}

export class Peer {
  public receiver: Receiver
  public forwarder: Forwarder
  private currentState!: IPeerState
  private interval!: NodeJS.Timeout
  private readonly states: { [id: string]: IPeerState }
  private readonly timeout: number = 1000

  constructor (state: string) {
    this.forwarder = new Forwarder()
    this.receiver = new Receiver(9000)
    this.states = {
      newbie: new NewbieState(this)
    }
    this.receiver.start()
    this.setupHandlers()
    this.changeState(state)
  }

  public changeState (state: string): void {
    clearInterval(this.interval)
    this.currentState = this.states[state]
    this.interval = setInterval(() => { this.currentState.loop() }, this.timeout)
  }

  public queryNetworkHandler (request: any): void {
    this.currentState.queryNetworkHandler(request)
  }

  private setupHandlers (): void {
    this.receiver.on('queryNetwork', (req) => {
      this.queryNetworkHandler(req)
    })
  }
}
