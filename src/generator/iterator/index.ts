export { AllCharacterStringIterator } from './AllCharacterStringIterator'
export { RandomStringIterator } from './RandomStringIterator'

// iterator interface
//  next () - returns IStringValue object
export interface IStringIterator {
  next (): string

  hasNext (): boolean
}
