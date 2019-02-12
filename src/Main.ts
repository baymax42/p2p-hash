import { fork } from 'child_process'
import * as path from 'path'
import { NetworkRegister } from './network/NetworkRegister'
import { Peer } from './state'
import { ActionManager } from './utils'

const serverProcess = fork(
  path.resolve('server.js'),
  [],
  {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  })

// const worker = fork(
//   path.resolve('worker.js'),
//   [],
//   {
//     stdio: ['pipe', 'pipe', 'pipe', 'ipc']
//   })

const peer = new Peer(new NetworkRegister(), new ActionManager(), 'newbie')
