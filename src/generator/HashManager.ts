import { EventEmitter } from 'events'
import { IHashEntry } from './index'
import { ChildProcess } from 'child_process'
import { LOGGER } from '../utils'

export class HashManager extends EventEmitter {
  private _hashes: IHashEntry[] = []
  private _file: string = ''
  public isWorking: boolean
  private workerProcess: ChildProcess

  constructor (workerProcess: ChildProcess) {
    super()
    this.workerProcess = workerProcess
    this.workerProcess.on('message', (request) => {
      LOGGER.log(request)
      if (request.type === 'result') {
        this.update(request.hash)
        LOGGER.log(request.hash)
      }
      this.isWorking = false
    })
    this.isWorking = false
  }

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

  public sendToWorker (hash: IHashEntry, wordLength: number) {
    if (!this.isWorking) {
      this.workerProcess.send({
        type: 'crackHash',
        wordLength: wordLength,
        hash: hash
      })
      this.isWorking = true
    } else {
      throw Error('Worker is already occupied')
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

  public getHash (taken: number[]): [number, IHashEntry] | undefined {
    for (let i = 0; i < this.hashes.length; i++) {
      if (taken.indexOf(i) === -1 && this.hashes[i].plaintext === '') {
        return [i, this.hashes[i]]
      }
    }
    return undefined
  }
}
