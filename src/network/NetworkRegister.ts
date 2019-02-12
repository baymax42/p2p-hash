export class NetworkRegister {
  public entries: Map<string, object>

  constructor () {
    this.entries = new Map()
  }

  public getEntry (address: string): object | undefined {
    return this.entries.get(address)
  }

  public upsertEntry (address: string, data: object): void {
    if (this.entries.has(address)) {
      const previous = this.entries.get(address)
      for (let content in data) {
        if (data[content] == null) {
          data[content] = previous[content]
        }
      }
    }
    this.entries.set(address, data)
  }

  public removeEntry (address: string): void {
    this.entries.delete(address)
  }

  public checkHash (hash: string): boolean {
    return true
  }
}
