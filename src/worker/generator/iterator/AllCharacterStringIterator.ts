import { ALL_SYMBOLS } from '../../utils'

export class AllCharacterStringIterator {
  public length: number
  private mapping: string
  private hasEnded: boolean
  private readonly currentString: number[]

  constructor (length: number) {
    this.mapping = ALL_SYMBOLS
    this.length = length
    this.hasEnded = false
    this.currentString = Array.from({ length: this.length }, () => 0)
  }

  public next (): string {
    if (!this.hasEnded) {
      const str = this.currentString.map((value: number) => this.mapping.charAt(value)).join('')
      this.constructNextString()
      return str
    } else {
      throw Error('Iterator is empty')
    }
  }

  public hasNext (): boolean {
    return !this.hasEnded
  }

  private constructNextString (): void {
    let div = 1
    let rem = 0
    for (let pos of this.currentString) {
      if (div > 0) {
        rem = (pos + div) % this.currentString.length
        div = Math.floor((pos + div) / this.currentString.length)

        pos = rem
      } else {
        break
      }
    }
    this.hasEnded = (div <= 0)
  }
}
