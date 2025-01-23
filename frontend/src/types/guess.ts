export interface Guess {
  year: number
  hint: Hint
}

export enum Hint {
  LOW = '⬆️',
  HIGH = '⬇️',
  CORRECT = '✅',
}
