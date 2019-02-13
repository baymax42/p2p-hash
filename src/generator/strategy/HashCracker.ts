import { IHashStrategy, MD5Strategy, SHA1Strategy, SHA256Strategy } from './index'

export class HashCracker {
  private strategy: IHashStrategy = new MD5Strategy()
  public setMethod (str: string) {
    if (str === 'md5') {
      this.strategy = new MD5Strategy()
    } else if (str === 'sha1') {
      this.strategy = new SHA1Strategy()
    } else if (str === 'sha256') {
      this.strategy = new SHA256Strategy()
    }
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
