import { NetworkFacade } from 'network'
import { ActionManager, HashManager } from 'utils'
import { NetworkRegister } from '../network/NetworkRegister'
import { DestinationState } from './DestinationState'
import { ElectionState } from './ElectionState'
import { IdleState } from './IdleState'
import { NewbieState } from './NewbieState'
import { SourceState } from './SourceState'
import { WorkerState } from './WorkerState'

export interface IPeerState {
  queryNetworkMessageHandler (request: any): void

  electionMessageHandler (request: any): void

  workingOnMessageHandler (request: any): void

  fetchFileMessageHandler (request: any): void

  initialize (): void
}

export class Peer {
  public networkFacade: NetworkFacade
  public network: string[] = []
  public actionManager: ActionManager
  public register: NetworkRegister
  private currentState!: IPeerState
  private readonly states: { [id: string]: IPeerState }

  constructor (hashManager: HashManager, register: NetworkRegister, actionManager: ActionManager, state: string) {
    this.register = register
    this.actionManager = actionManager
    this.states = {
      destination: new DestinationState(this),
      election: new ElectionState(this),
      idle: new IdleState(this),
      newbie: new NewbieState(this),
      source: new SourceState(this),
      worker: new WorkerState(this)
    }

    this.networkFacade = new NetworkFacade()
    this.setupHandlers()
    this.changeState(state)
  }

  public changeState (state: string): void {
    this.actionManager.clearAll()
    this.currentState = this.states[state]
    this.currentState.initialize()
  }

  public queryNetworkMessageHandler (request: any): void {
    this.currentState.queryNetworkMessageHandler(request)
  }

  public workingOnMessageHandler (request: any): void {
    this.currentState.workingOnMessageHandler(request)
  }

  public electionMessageHandler (request: any): void {
    this.currentState.electionMessageHandler(request)
  }

  public fetchFileMessageHandler (request: any): void {
    this.currentState.fetchFileMessageHandler(request)
  }

  private setupHandlers (): void {
    this.networkFacade
      .on('queryNetwork', (req) => this.queryNetworkMessageHandler(req))
      .on('workingOn', (req) => this.workingOnMessageHandler(req))
      .on('election', (req) => this.electionMessageHandler(req))
      .on('fetchFile', (req) => this.fetchFileMessageHandler(req))
  }
}
