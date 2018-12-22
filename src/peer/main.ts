import dgram from 'dgram'
import { AddressInfo } from 'net'
import { LOGGER } from 'utils'
import { Forwarder } from './communication'
import { Peer } from './state'

const peer = new Peer('newbie')
