import { Forwarder, Receiver } from './network'
import { Registry } from './network/Registry'
import { Peer } from './state'

const registry = new Registry()
const forwarder = new Forwarder(registry)
const receiver = new Receiver(9000)

new Peer(forwarder, receiver, 'newbie')
