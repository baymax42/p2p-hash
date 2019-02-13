import { IHashStrategy } from './index'

export class HashCracker {
  private strategy: IHashStrategy

  public constructor (str: IHashStrategy) {
    this.strategy = str
  }

  public setMethod (str: IHashStrategy) {
    this.strategy = str
  }

  public crackHash (hash: string): string {
    return this.strategy.crackHash(hash)
  }
}
