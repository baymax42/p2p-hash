import * as crypto from 'crypto'
import { RandomString } from './generator'

function createHashFile (amount: number, wordLength: number, hashMethods: string[], path: string) {
  const randomStringIterator = new RandomString(wordLength, amount).iterator()
  const fs = require('fs')
  const logger = fs.createWriteStream(path, {
    flags: 'w'
  })

  while (randomStringIterator.hasNext()) {
    const randomString = randomStringIterator.next()
    const hashMethod = hashMethods[Math.floor(Math.random() * hashMethods.length)]
    const hash = crypto.createHash(hashMethod)
    const hashString = hash.update(randomString).digest('hex')
    logger.write(hashString + '\n')
  }
  logger.end()
}

const methods = ['md5', 'sha1']
createHashFile(5, 4, methods, 'testHashFile.txt')
