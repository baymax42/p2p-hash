import { IStringIterator, RandomStringIterator } from './iterator'
import { IString } from './index'

// RandomString
// Helper generator class for generating specific amount of random strings of given length
export class RandomString implements IString {
  public wordLength: number
  public amount: number

  constructor (wordLength: number, amount: number) {
    this.wordLength = wordLength
    this.amount = amount
  }

  public iterator (): IStringIterator {
    return new RandomStringIterator(this.wordLength, this.amount)
  }
}
