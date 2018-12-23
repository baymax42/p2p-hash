import { AllCharacterStringIterator, IStringIterator, RandomStringIterator } from './iterator'

export { IStringIterator }

export interface IString {
  iterator (): IStringIterator
}

export class AllCharacterString {
  public length: number

  constructor (length: number) {
    this.length = length
  }

  public iterator (): IStringIterator {
    return new AllCharacterStringIterator(this.length)
  }
}

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
