import { fork } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { NetworkRegister } from './network/NetworkRegister'
import { Peer } from './state'
import { ActionManager, HashManager } from './utils'

const serverProcess = fork(path.resolve('server.js'), [])

const worker = fork(path.resolve('worker.js'), [])

const hashFile = process.argv[2]
const hashManager = new HashManager(worker)

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

hashManager.on('change', (out) => {
  serverProcess.send({
    content: out,
    file: hashManager.file,
    type: 'message'
  })
})

const peer = new Peer(hashManager, new NetworkRegister(), new ActionManager(), 'newbie')
