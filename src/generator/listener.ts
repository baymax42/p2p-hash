import { HashWorker } from './strategy/HashWorker'

const hasher: HashWorker = new HashWorker()

function breakTheHash (hash: string) {
  const { ifCracked, decrypted } = hasher.decrypt(hash)
  if (ifCracked) {
    // emit the answer with decrypted word
  } else {
    // emit the negative answer
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
