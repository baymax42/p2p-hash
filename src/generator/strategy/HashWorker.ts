import { MD5Strategy } from './concreteStrategies/MD5Strategy'
import { SHA1Strategy } from './concreteStrategies/SHA1Strategy'
import { SHA256Strategy } from './concreteStrategies/SHA256Strategy'
import { HashCracker } from './HashCracker'
import { IHashEntry, IString } from '../index'

export class HashWorker {
  private cracker!: HashCracker

  public constructor (collection: IString) {
    this._collection = collection
  }

  private _collection: IString

  get collection (): IString {
    return this._collection
  }

  set collection (value: IString) {
    this._collection = value
  }

  public crackHash (hash: IHashEntry): IHashEntry {
    if (this.determineAlgorithm(hash)) {
      return {
        method: hash.method,
        hash: hash.hash,
        plaintext: this.cracker.crackHash(hash.hash)
      }
    } else {
      throw Error('Hash not recognized')
    }
  }

  private determineAlgorithm (hash: IHashEntry): boolean {
    this.cracker = new HashCracker(new MD5Strategy(this._collection))
    if (hash.method === 'md5') {
      this.cracker.setMethod(new MD5Strategy(this._collection))
      return true
    } else if (hash.method === 'sha1') {
      this.cracker.setMethod(new SHA1Strategy(this._collection))
      return true
    } else if (hash.method === 'sha256') {
      this.cracker.setMethod(new SHA256Strategy(this._collection))
      return true
    } else {
      return false
    }
  }
}
