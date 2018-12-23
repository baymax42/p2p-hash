import { ALL_SYMBOLS } from '../../utils'

export class RandomStringIterator {
  public wordLength: number
  public amount: number
  public amountCounter: number
  private mapping: string

  constructor (wordLength: number, amount: number) {
    this.wordLength = wordLength
    this.amount = amount
    this.amountCounter = 0
    this.mapping = ALL_SYMBOLS
  }

  public next (): string {
    if (this.hasNext()) {
      const randomString = []
      for (let i = 0; i < this.wordLength; i++) {
        randomString[i] = ALL_SYMBOLS[Math.floor(Math.random() * ALL_SYMBOLS.length)]
      }
      this.amountCounter++
      return randomString.join('')
    } else {
      throw Error('Iterator is empty')
    }
  }

  public hasNext (): boolean {
    return this.amountCounter < this.amount
  }
}
