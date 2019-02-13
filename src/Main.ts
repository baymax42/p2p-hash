import { fork } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { NetworkRegister } from './network/NetworkRegister'
import { Peer } from './state'
import { ActionManager, HashManager } from './utils'

const serverProcess = fork(path.resolve('server.js'), [])

// const worker = fork(
//   path.resolve('worker.js'),
//   [],
//   {
//     stdio: ['pipe', 'pipe', 'pipe', 'ipc']
//   })

const hashFile = process.argv[2]
const hashManager = new HashManager()

if (hashFile) {
  fs.readFile(hashFile, (err, data) => {
    if (!err) {
      hashManager.file = hashFile
      hashManager.parseFile(data.toString())
    } else {
      throw ReferenceError('File does not exist')
    }
  })
}

serverProcess.on('message', (content) => {
  hashManager.once('change', (out) => {
    serverProcess.send({
      content: out,
      type: 'message'
    })
  })
})

// TODO: remove after it is fully functional
setInterval(() => {
  hashManager.update({
    hash: 'f7b013eeb82da1340028f188231e6645535c5bee1ccbdf8ce5476fc1cf327eb9',
    method: 'sha256',
    plaintext: 'abcd'
  })
}, 4000)

const peer = new Peer(hashManager, new NetworkRegister(), new ActionManager(), 'newbie')
