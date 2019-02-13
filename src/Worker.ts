import { HashWorker } from './generator/strategy/HashWorker'
import { LOGGER } from './utils'
import { AllCharacterString } from './generator'

let hashWorker!: HashWorker

if (!process) {
  LOGGER.error('Worker process should be spawned as child process')
} else {
  process.on('message', (request) => {
    if (request.type === 'crackHash') {
      let wordLength = request.wordLength
      let collection = new AllCharacterString(wordLength)

      if (!hashWorker) {
        hashWorker = new HashWorker(collection)
      } else {
        hashWorker.collection = collection
      }

      let result = request.hash
      try {
        result = hashWorker.crackHash(request.hash)
      } finally {
        // @ts-ignore
        process.send({
          type: 'result',
          wordLength: wordLength,
          hash: result
        })
      }
    }
  })
}
