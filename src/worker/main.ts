import * as crypto from 'crypto'
import { AllCharacterString, IString } from './generator'
import { LOGGER } from './utils'

const SHA256 = crypto.createHash('sha256')
LOGGER.log('SHA256: ' + SHA256.update('hex').digest('hex'))

function iterate (generator: IString): void {
  const it = generator.iterator()
  while (it.hasNext()) {
    LOGGER.log(it.next())
  }
}

const iter = new AllCharacterString(2)
iterate(iter)
