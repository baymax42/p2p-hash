import { HashWorker } from './generator/strategy/HashWorker'
import { LOGGER } from './utils'

const hasher: HashWorker = new HashWorker()

function breakTheHash (hash: string) {
  const { ifCracked, decrypted } = hasher.decrypt(hash, 3)
  if (ifCracked) {
    LOGGER.log('Hash broken: ' + decrypted + '\n')
  } else {
    LOGGER.log('Proper hash not found\n')
  }
}

// awaits hash events and starts the decryption process
function awaitHashes (): never {
  const events = require('events')
  const eventEmitter = new events.EventEmitter()
  while (true) {
    eventEmitter.on('hash', breakTheHash)
  }
}

breakTheHash('0abd4da437c145a86680366918042b62')
breakTheHash('7e6cbc6f798fc2704a565864f4871a36dca0705000e2440ab6882aa169a03a83')
