import { IStringIterator } from './iterator'

export { IStringIterator }
export { AllCharacterString } from './AllCharacterString'
export { RandomString } from './RandomString'

// Interface for all generator classes
export interface IString {
  iterator (): IStringIterator
}

export interface IHashEntry {
  method: string
  hash: string
  plaintext: string
}
