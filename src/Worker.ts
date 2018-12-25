import { LOGGER } from 'utils'
import { AllCharacterString, IString } from './generator'

function iterate (generator: IString): void {
  const it = generator.iterator()
  while (it.hasNext()) {
    LOGGER.log(it.next())
  }
}

const iter = new AllCharacterString(1)
iterate(iter)
