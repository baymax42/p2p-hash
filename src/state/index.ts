import { Forwarder, Receiver } from '../communication'
import { NewbieState } from './NewbieState'

export interface IPeerState {
  loop (): void

  queryNetworkHandler (request: object): void

  electionHandler (request: any): void

  aliveHandler (request: any): void

  resultHandler (request: any): void
}

export class Peer {
  public receiver: Receiver
  public forwarder: Forwarder
  private currentState!: IPeerState
  private interval!: NodeJS.Timeout
  private readonly states: { [id: string]: IPeerState }
  private readonly timeout: number = 1000

  constructor (forwarder: Forwarder, receiver: Receiver, state: string) {
    this.forwarder = forwarder
    this.receiver = receiver
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

  public electionHandler (request: any): void {
    this.currentState.electionHandler(request)
  }

  public aliveHandler (request: any): void {
    this.currentState.aliveHandler(request)
  }

  public resultHandler (request: any): void {
    this.currentState.resultHandler(request)
  }

  private setupHandlers (): void {
    this.receiver.on('queryNetwork', (req) => {
      this.queryNetworkHandler(req)
    })
  }
}
