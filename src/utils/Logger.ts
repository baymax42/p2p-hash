import { Console } from 'console'
import process from 'process'

export class Logger extends Console {
  constructor (stdout: NodeJS.WritableStream, stderr: NodeJS.WritableStream, ignoreErrors: boolean) {
    super(stdout, stderr, ignoreErrors)
  }

  public format_log (address: string, state: string, content: any) {
    this.log(`[${new Date().toLocaleString()}][${state}]{${address}}: ${content}`)
  }
}

export const LOGGER = new Logger(process.stdout, process.stderr, false)
