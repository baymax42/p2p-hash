// ActionManager
// Class which manages timed callbacks and callback with interval
// and ties them with specific name
export class ActionManager {
  // Store intervals and timeouts in separate maps
  // We need to clear specific types with different functions
  private intervals: Map<string, NodeJS.Timeout> = new Map<string, NodeJS.Timeout>()
  private timeouts: Map<string, NodeJS.Timeout> = new Map<string, NodeJS.Timeout>()

  public addCyclicAction (name: string, callback: () => void, interval: number) {
    if (this.intervals.has(name)) {
      // @ts-ignore - It won't return undefined
      clearInterval(this.intervals.get(name))
    }
    this.intervals.set(name, setInterval(callback, interval))
  }

  public addTimedAction (name: string, callback: () => void, timeout: number) {
    if (this.timeouts.has(name)) {
      // @ts-ignore - It won't return undefined
      clearTimeout(this.actions.get(name))
    }
    this.timeouts.set(name, setTimeout(callback, timeout))
  }

  public clearTimedAction (name: string): void {
    if (this.timeouts.has(name)) {
      // @ts-ignore - It won't return undefined
      clearTimeout(this.timeouts.get(name))
    }
  }

  public clearCyclicAction (name: string): void {
    if (this.intervals.has(name)) {
      // @ts-ignore - It won't return undefined
      clearInterval(this.intervals.get(name))
    }
  }

  public clearAll (): void {
    for (const action of this.intervals.values()) {
      clearInterval(action)
    }
    this.intervals.clear()

    for (const action of this.timeouts.values()) {
      clearTimeout(action)
    }
    this.timeouts.clear()
  }
}
