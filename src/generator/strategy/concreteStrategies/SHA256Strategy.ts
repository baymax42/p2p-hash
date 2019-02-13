import { createHash } from 'crypto'
import { AllCharacterString } from '../../AllCharacterString'
import { IHashStrategy } from '../index'

export class SHA256Strategy implements IHashStrategy {
  public crackHash (hash: string): string {
    let temporary: string
    let checked: string
    const allStringIterator = new AllCharacterString(10).iterator()
    do {
      checked = allStringIterator.next()
      temporary = createHash('sha256').update(checked).update('hex').toString()
      if (temporary === hash) {
        return checked
      }
    } while (allStringIterator.hasNext())
    // empty string means that there was no fitting word
    return ''
  }
}
