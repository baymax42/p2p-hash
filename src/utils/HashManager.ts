import { EventEmitter } from 'events'

export interface IHashEntry {
  method: string
  hash: string
  plaintext: string
}

export class HashManager extends EventEmitter {
  private _hashes: IHashEntry[] = []

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
}
