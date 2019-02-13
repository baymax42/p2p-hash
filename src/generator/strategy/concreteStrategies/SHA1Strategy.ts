import { createHash } from 'crypto'
import { AllCharacterString } from '../../AllCharacterString'
import { IHashStrategy } from '../index'
import { IString } from '../../index'

export class SHA1Strategy implements IHashStrategy {
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
      temporary = createHash('sha1').update(checked).digest('hex').toString()
      if (temporary === hash) {
        return checked
      }
    } while (allStringIterator.hasNext())
    // empty string means that there was no fitting word
    return ''
  }
}
