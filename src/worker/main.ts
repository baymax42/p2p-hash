import * as crypto from 'crypto'
import { LOGGER } from 'src/utils'
import { AllCharacterString, IString } from './generator'

const SHA256 = crypto.createHash('sha256')
LOGGER.log('SHA256: ' + SHA256.update('hex').digest('hex'))

function iterate (generator: IString): void {
  const it = generator.iterator()
  while (it.hasNext()) {
    LOGGER.log(it.next())
  }
}

const iter = new AllCharacterString(1)
iterate(iter)
