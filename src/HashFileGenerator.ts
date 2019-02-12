import { createHash } from 'crypto'
import { RandomString } from './generator'
import { LOGGER } from './utils'

function createHashFile (amount: number, wordLength: number, hashMethods: string[], path: string) {
  const randomStringIterator = new RandomString(wordLength, amount).iterator()
  const fs = require('fs')
  const logger = fs.createWriteStream(path, {
    flags: 'w'
  })
  while (randomStringIterator.hasNext()) {
    const randomString = randomStringIterator.next()
    const hashMethod = hashMethods[Math.floor(Math.random() * hashMethods.length)]
    const hash = createHash(hashMethod)
    const hashString = hash.update(randomString).digest('hex')
    logger.write(hashMethod + ' ' + hashString + '\n')
  }
  logger.end()
}

const methods = ['md5', 'sha1', 'sha256']

let hashAmount = -1
let length = -1
process.argv.forEach((value, index) => {
  const arg = value.split('=')
  if (arg.length === 2 && arg[0] === 'amount') {
    hashAmount = Number(arg[1])
  } else if (arg.length === 2 && arg[0] === 'length') {
    length = Number(arg[1])
  }
})

if (hashAmount < 1 || length < 1) {
  LOGGER.log('Example usage:')
  LOGGER.log('node fileGenerator.js amount=2 length=5')
} else {
  createHashFile(hashAmount, length, methods, 'testHashFile.txt')
}
