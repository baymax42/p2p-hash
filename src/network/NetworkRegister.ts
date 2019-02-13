interface INetworkEntry {
  file: boolean,
  hashIndex: number

  [key: string]: any
}

export class NetworkRegister {
  public elected: string | undefined

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

  public static returnGreaterOrEqualAddress (address1: string, address2: string): string {
    const addr1 = address1.split('.').reverse()
    const addr2 = address2.split('.').reverse()

    for (let i = 0; i < addr1.length; i++) {
      if (addr1[i] > addr2[i]) {
        return address1
      } else if (addr1[i] < addr2[i]) {
        return address2
      }
    }
    // if addresses are equal, return first
    return address1
  }
}
