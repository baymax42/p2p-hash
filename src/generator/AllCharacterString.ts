import { AllCharacterStringIterator, IStringIterator } from './iterator'

// AllCharacterString
// Helper generator class for generating strings of given length
export class AllCharacterString {
  public length: number

  constructor (length: number) {
    this.length = length
  }

  public iterator (): IStringIterator {
    return new AllCharacterStringIterator(this.length)
  }
}
