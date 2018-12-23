import * as crypto from 'crypto'
import { RandomString } from './worker/generator'

function createHashFile (amount: number, wordLength: number, hashMethod: string, path: string) {
  const randomStringIterator = new RandomString(wordLength, amount).iterator()
  const fs = require('fs')
  const logger = fs.createWriteStream(path, {
    flags: 'w'
  })

  while (randomStringIterator.hasNext()) {
    const randomString = randomStringIterator.next()
    const hash = crypto.createHash(hashMethod)
    const hashString = hash.update(randomString).digest('hex')
    logger.write(hashString + '\n')
  }
  logger.end()
}

createHashFile(5, 4, 'md5', 'testHashFile.txt')
