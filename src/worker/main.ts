import { AllCharacterString, IString, RandomString } from './generator'
import { LOGGER } from './utils'

function iterate (generator: IString): void {
  const it = generator.iterator()
  while (it.hasNext()) {
    LOGGER.log(it.next())
  }
}

const iter = new AllCharacterString(1)
iterate(iter)

const iterR = new RandomString(3, 5)
iterate(iterR)
