export { MD5Strategy } from './concreteStrategies/MD5Strategy'
export { SHA1Strategy } from './concreteStrategies/SHA1Strategy'
export { SHA256Strategy } from './concreteStrategies/SHA256Strategy'

export interface IHashStrategy {
  crackHash (hash: string): string
}
