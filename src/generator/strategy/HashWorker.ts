import { MD5Strategy } from './concreteStrategies/MD5Strategy'
import { SHA1Strategy } from './concreteStrategies/SHA1Strategy'
import { SHA256Strategy } from './concreteStrategies/SHA256Strategy'
import { HashCracker } from './HashCracker'

export class HashWorker {
  private crack: HashCracker = new HashCracker(new MD5Strategy())
  public decrypt (hash: string) {
    this.determineAlgorithm(hash)
    return this.crack.crackHash(hash)
  }
  private determineAlgorithm (hash: string): boolean {
    if (hash.length === 32) {
      this.crack.setMethod(new MD5Strategy())
      return true
    } else if (hash.length === 40) {
      this.crack.setMethod(new SHA1Strategy())
      return true
    } else if (hash.length === 64) {
      this.crack.setMethod(new SHA256Strategy())
      return true
    } else {
      return false
    }
  }
}
