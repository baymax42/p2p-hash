// ActionManager
// Class which manages timed callbacks and callback with interval
// and ties them with specific name

export interface IAction {
  name: string,
  callback: () => void,
  timeout: number
}

export class ActionManager {
  // Store intervals and timeouts in separate maps
  // We need to clear specific types with different functions
  private intervals: Map<string, NodeJS.Timeout> = new Map<string, NodeJS.Timeout>()
  private timeouts: Map<string, NodeJS.Timeout> = new Map<string, NodeJS.Timeout>()

  public addCyclicAction (action: IAction) {
    if (this.intervals.has(action.name)) {
      // @ts-ignore - It won't return undefined
      clearInterval(this.intervals.get(name))
    }
    this.intervals.set(action.name, setInterval(action.callback, action.timeout))
  }

  public addTimedAction (action: IAction) {
    if (this.timeouts.has(action.name)) {
      // @ts-ignore - It won't return undefined
      clearTimeout(this.timeouts.get(action.name))
    }
    this.timeouts.set(action.name, setTimeout(action.callback, action.timeout))
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
