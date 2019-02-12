import { IStringIterator, RandomStringIterator } from './iterator'

// RandomString
// Helper generator class for generating specific amount of random strings of given length
export class RandomString {
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
