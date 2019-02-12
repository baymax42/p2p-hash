import { Forwarder, Receiver } from 'network'
import { ActionManager} from 'utils'
import { ElectionState } from './ElectionState'
import { NewbieState } from './NewbieState'
import { WorkerState } from './WorkerState'
import {IdleState} from "./IdleState";
import {SourceState} from "./SourceState";
import {DestinationState} from "./DestinationState";
import {NetworkRegister} from "../network/NetworkRegister";

export interface IPeerState {
  queryNetworkMessageHandler (request: any): void

  electionMessageHandler (request: any): void

  workingOnMessageHandler (request: any): void

  fetchFileMessageHandler (request: any): void

  setupActions (): void
}

export class Peer {
  public receiver: Receiver
  public forwarder: Forwarder
  public network: string[] = []
  public actionManager: ActionManager
  public register: NetworkRegister
  private currentState!: IPeerState
  private readonly states: { [id: string]: IPeerState }

  constructor (forwarder: Forwarder, receiver: Receiver, register: NetworkRegister, actionManager: ActionManager, state: string) {
    this.forwarder = forwarder
    this.receiver = receiver
    this.register = register
    this.actionManager = actionManager
    this.states = {
      election: new ElectionState(this),
      newbie: new NewbieState(this),
      worker: new WorkerState(this),
      idle: new IdleState(this),
      source: new SourceState(this),
      destination: new DestinationState(this)
    }

    this.receiver.start()
    this.setupHandlers()
    this.changeState(state)
  }

  public changeState (state: string): void {
    this.actionManager.clearAll()
    this.currentState = this.states[state]
    this.currentState.setupActions()
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
    this.receiver
      .on('queryNetwork', (req) => this.queryNetworkMessageHandler(req))
      .on('workingOn', (req) => this.workingOnMessageHandler(req))
      .on('election', (req) => this.electionMessageHandler(req))
      .on('fetchFile', (req) => this.fetchFileMessageHandler(req))
  }
}
