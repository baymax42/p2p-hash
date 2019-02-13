import { HashCracker } from './HashCracker'

export class HashWorker {
  private crack: HashCracker = new HashCracker()
  public decrypt (hash: string) {
    this.determineAlgorithm(hash)
    return this.crack.crackHash(hash)
  }
  private determineAlgorithm (hash: string): boolean {
    if (hash.length === 32) {
      this.crack.setMethod('md5')
      return true
    } else if (hash.length === 40) {
      this.crack.setMethod('sha1')
      return true
    } else if (hash.length === 64) {
      this.crack.setMethod('sha256')
      return true
    } else {
      return false
    }
  }
}
