import { IHashStrategy } from './index'

export class HashCracker {
  private strategy: IHashStrategy
  public constructor (str: IHashStrategy) {
    this.strategy = str
  }
  public setMethod (str: IHashStrategy) {
    this.strategy = str
  }
  public crackHash (hash: string): {ifCracked: boolean, decrypted: string} {
    const decrypted = this.strategy.crackHash(hash)
    if (decrypted === '') {
      const ifCracked: boolean = false
      return { ifCracked, decrypted }
    } else {
      const ifCracked: boolean = true
      return { ifCracked, decrypted }
    }
  }
}
