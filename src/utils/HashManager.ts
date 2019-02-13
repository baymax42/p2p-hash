import { EventEmitter } from 'events'

export interface IHashEntry {
  method: string
  hash: string
  plaintext: string
}

export class HashManager extends EventEmitter {
  private _hashes: IHashEntry[] = []
  private _file: string = ''

  get file (): string {
    return this._file
  }

  set file (value: string) {
    this._file = value
  }

  get hashes (): IHashEntry[] {
    return this._hashes
  }

  set hashes (value: IHashEntry[]) {
    this._hashes = value
  }

  public update (entry: IHashEntry): void {
    const found = this._hashes.findIndex((v) => {
      return v.hash === entry.hash && v.method === entry.method
    })
    if (found !== -1) {
      this._hashes[found].plaintext = entry.plaintext
      this.emit('change', {
        all: this._hashes,
        solved: this._hashes.filter((v) => v.plaintext !== '')
      })
    }
  }

  public parseFile (content: string) {
    const lines = content.split('\n')
    const hashes: IHashEntry[] = []
    lines.forEach((value, index) => {
      const splitLine = value.trim().split(' ')
      if (splitLine.length === 2) {
        hashes.push({
          hash: splitLine[1],
          method: splitLine[0],
          plaintext: ''
        })
      }
    })
    this.hashes = hashes
  }
}
