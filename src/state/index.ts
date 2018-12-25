import { Forwarder, Receiver } from '../network'
import { NewbieState } from './NewbieState'
import { LOGGER } from '../utils'

export interface IPeerState {
  queryNetworkHandler (request: object): void

  electionHandler (request: any): void

  aliveHandler (request: any): void

  resultHandler (request: any): void

  setupCyclicActions (): void
}

export class Peer {
  public receiver: Receiver
  public forwarder: Forwarder
  private currentState!: IPeerState
  private cyclicActions: Map<string, NodeJS.Timeout> = new Map<string, NodeJS.Timeout>()
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
    this.removeCyclicActions()
    this.currentState = this.states[state]
    LOGGER.log(this.currentState)
    this.currentState.setupCyclicActions()
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

  public addCyclicAction (name: string, callback: () => void, interval: number) {
    if (this.cyclicActions.has(name)) {
      // @ts-ignore - It won't return undefined
      clearInterval(this.cyclicActions.get(name))
    }
    this.cyclicActions.set(name, setInterval(callback, interval))
  }

  public removeCyclicActions (): void {
    for (const action of this.cyclicActions.values()) {
      clearInterval(action)
    }
  }

  private setupHandlers (): void {
    this.receiver
      .on('queryNetwork', (req) => this.queryNetworkHandler(req))
      .on('election', (req) => this.electionHandler(req))
  }
}
