import { MD5Strategy } from './concreteStrategies/MD5Strategy'
import { SHA1Strategy } from './concreteStrategies/SHA1Strategy'
import { SHA256Strategy } from './concreteStrategies/SHA256Strategy'
import { HashCracker } from './HashCracker'
import { AllCharacterString, IString } from '../index'

export class HashWorker {
  private crack: HashCracker
  public constructor () {
    this.crack = new HashCracker(new MD5Strategy(new AllCharacterString(1)))
  }
  public decrypt (hash: string, length: number) {
    if (this.determineAlgorithm(hash, length)) {
      return this.crack.crackHash(hash)
    } else {
      throw Error('Hash not recognized')
    }
  }
  private determineAlgorithm (hash: string, length: number): boolean {
    const istring: IString = new AllCharacterString(length)
    if (hash.length === 32) {
      this.crack.setMethod(new MD5Strategy(istring))
      return true
    } else if (hash.length === 40) {
      this.crack.setMethod(new SHA1Strategy(istring))
      return true
    } else if (hash.length === 64) {
      this.crack.setMethod(new SHA256Strategy(istring))
      return true
    } else {
      return false
    }
  }
}
