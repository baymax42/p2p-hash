interface INetworkEntry {
  file: boolean,
  hash: string

  [key: string]: any
}

export class NetworkRegister {
  constructor () {
    this._entries = new Map()
  }

  private _entries: Map<string, INetworkEntry>

  get entries (): Map<string, INetworkEntry> {
    return this._entries
  }

  public getEntry (address: string): INetworkEntry | undefined {
    return this._entries.get(address)
  }

  public upsertEntry (address: string, data: any): void {
    if (this._entries.has(address)) {
      const previous = this._entries.get(address)
      for (const content in data) {
        if (data[content] == null) {
          data[content] = previous[content]
        }
      }
    }
    this._entries.set(address, data)
  }

  public removeEntry (address: string): void {
    this._entries.delete(address)
  }

  public checkHash (hash: string): boolean {
    return true
  }
}
