import { Forwarder, Receiver } from './network'
import { Peer } from './state'
import { ActionManager } from './utils'

new Peer(new Forwarder(), new Receiver(9000), new ActionManager(), 'newbie')
