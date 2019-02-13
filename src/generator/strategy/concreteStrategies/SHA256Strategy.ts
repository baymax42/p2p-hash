import { createHash } from 'crypto'
import { IHashStrategy } from '../index'
import { IString } from '../../index'

export class SHA256Strategy implements IHashStrategy {
  private istring: IString

  constructor (collection: IString) {
    this.istring = collection
  }

  public crackHash (hash: string): string {
    let temporary: string
    let checked: string
    const allStringIterator = this.istring.iterator()
    do {
      checked = allStringIterator.next()
      temporary = createHash('sha256').update(checked).digest('hex')
      if (temporary.toLowerCase() === hash.toLowerCase()) {
        return checked
      }
    } while (allStringIterator.hasNext())
    // empty string means that there was no fitting word
    throw Error('Unable to crack hash')
  }
}
