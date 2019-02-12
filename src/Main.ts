import * as fs from 'fs'
import { NetworkRegister } from './network/NetworkRegister'
import { Peer } from './state'
import { ActionManager, HashManager, IHashEntry } from './utils'

// const serverProcess = fork(
//   path.resolve('server.js'),
//   [],
//   {
//     stdio: ['pipe', 'pipe', 'pipe', 'ipc']
//   })

// const worker = fork(
//   path.resolve('worker.js'),
//   [],
//   {
//     stdio: ['pipe', 'pipe', 'pipe', 'ipc']
//   })

function parseFile (content: string): IHashEntry[] {
  const lines = content.split('\n')
  const hashes: IHashEntry[] = []
  lines.forEach((value, index) => {
    const splitLine = value.trim().split(' ')
    if (splitLine.length === 2) {
      hashes.push({
        hash: splitLine[1],
        method: splitLine[0],
        plaintext: ''
      })
    }
  })
  return hashes
}

const hashFile = process.argv[2]
const hashManager = new HashManager()

if (hashFile) {
  fs.readFile(hashFile, (err, data) => {
    if (!err) {
      const hashes = parseFile(data.toString())
      hashManager.hashes = hashes
    }
  })
}
const peer = new Peer(hashManager, new NetworkRegister(), new ActionManager(), 'newbie')
