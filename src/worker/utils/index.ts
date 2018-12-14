import { Console } from 'console'
import process from 'process'

export const CHARS = 'abcdefghijklmnopqrstuvwxyz'
export const NUMBERS = '0123456789'
export const SPECIALS = '!@#$%^&*()_+{}[]-=;\':"|\\<>,.?/~`'
export const ALL_SYMBOLS = (CHARS + CHARS.toLocaleUpperCase() + NUMBERS + SPECIALS)
export const LOGGER = new Console({ stdout: process.stdout, stderr: process.stderr })
