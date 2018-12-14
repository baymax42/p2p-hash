import { AllCharacterStringIterator, IStringIterator } from './iterator'

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
