import { ALL_SYMBOLS } from '../../utils'

export class AllCharacterStringIterator {
  public length: number
  private mapping: string
  private hasEnded: boolean
  private currentString: number[]

  constructor (length: number) {
    this.mapping = ALL_SYMBOLS
    this.length = length
    this.hasEnded = false
    this.currentString = Array.from({ length: this.length }, () => 0)
  }

  public next (): string {
    if (!this.hasEnded) {
      const str = this.currentString.map((value: number) => this.mapping.charAt(value)).join('')
      if (Array.from(str).every((v) => v === ALL_SYMBOLS.charAt(ALL_SYMBOLS.length - 1))) {
        this.hasEnded = true
      } else {
        this.constructNextString()
      }
      return str
    } else {
      throw Error('Iterator is empty')
    }
  }

  public hasNext (): boolean {
    return !this.hasEnded
  }

  private constructNextString (): void {
    let rem = 0
    for (const j in this.currentString) {
      if (Number(j) === 0) {
        if (this.currentString[j] + rem >= ALL_SYMBOLS.length - 1) {
          rem = 1
          this.currentString[j] = (this.currentString[j] + rem) % ALL_SYMBOLS.length
        } else {
          this.currentString[j] = this.currentString[j] + 1 + rem
          rem = 0
        }
      } else {
        if (this.currentString[j] + rem > ALL_SYMBOLS.length - 1) {
          rem = 1
          this.currentString[j] = (this.currentString[j] + rem) % ALL_SYMBOLS.length
        } else {
          this.currentString[j] = this.currentString[j] + rem
          rem = 0
        }
      }
    }
  }
}
