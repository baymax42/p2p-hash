import { Forwarder, Receiver } from 'network'
import { ActionManager, LOGGER } from 'utils'
import { ElectionState } from './ElectionState'
import { NewbieState } from './NewbieState'
import { WorkerState } from './WorkerState'

export interface IPeerState {
  queryNetworkMessageHandler (request: any): void

  networkMessageHandler (request: any): void

  electionMessageHandler (request: any): void

  aliveMessageHandler (request: any): void

  resultMessageHandler (request: any): void

  setupActions (): void
}

export class Peer {
  public receiver: Receiver
  public forwarder: Forwarder
  public network: string[] = []
  public actionManager: ActionManager
  private currentState!: IPeerState
  private readonly states: { [id: string]: IPeerState }

  constructor (forwarder: Forwarder, receiver: Receiver, actionManager: ActionManager, state: string) {
    this.forwarder = forwarder
    this.receiver = receiver
    this.actionManager = actionManager
    this.states = {
      election: new ElectionState(this),
      newbie: new NewbieState(this),
      worker: new WorkerState(this)
    }

    this.receiver.start()
    this.setupHandlers()
    this.changeState(state)
  }

  public changeState (state: string): void {
    this.actionManager.clearAll()
    LOGGER.log(`STATE HAS CHANGED: ${state}`)
    this.currentState = this.states[state]
    this.currentState.setupActions()
  }

  public queryNetworkMessageHandler (request: any): void {
    this.currentState.queryNetworkMessageHandler(request)
  }

  public networkMessageHandler (request: any): void {
    this.currentState.networkMessageHandler(request)
  }

  public electionMessageHandler (request: any): void {
    this.currentState.electionMessageHandler(request)
  }

  public aliveMessageHandler (request: any): void {
    this.currentState.aliveMessageHandler(request)
  }

  public resultMessageHandler (request: any): void {
    this.currentState.resultMessageHandler(request)
  }

  private setupHandlers (): void {
    this.receiver
      .on('queryNetwork', (req) => this.queryNetworkMessageHandler(req))
      .on('network', (req) => this.networkMessageHandler(req))
      .on('election', (req) => this.electionMessageHandler(req))
      .on('alive', (req) => this.aliveMessageHandler(req))
      .on('result', (req) => this.resultMessageHandler(req))
  }
}
