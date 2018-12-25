export const __BROADCAST__ = '__all__'

export interface IRegistry {
  register (ip: string): string

  getIP (id: string): string

  remove (id: string): void
}

export class Registry {
  private registry: {
    [identifier: string]:
      { ip: string, chunk: number }
  } = {}

  constructor () {
    this.registry[__BROADCAST__] = {
      chunk: 0,
      ip: '255.255.255.255'
    }
  }

  public register (ip: string): string {
    const id = this.generateID()
    this.registry[id] = {
      chunk: -1,
      ip
    }
    return id
  }

  public getIP (id: string): string {
    return this.registry[id].ip
  }

  public remove (id: string): void {
    delete this.registry[id]
  }

  private generateID (): string {
    return Math.random().toString(36).substr(2, 10)
  }
}
