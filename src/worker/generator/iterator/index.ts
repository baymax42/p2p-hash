export { AllCharacterStringIterator } from './AllCharacterStringIterator'

// iterator interface
//  next () - returns IStringValue object
export interface IStringIterator {
  next (): string

  hasNext (): boolean
}
