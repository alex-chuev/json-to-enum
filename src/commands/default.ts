import { Command } from '../enums/Command'
import { Arguments, Argv } from 'yargs'

export interface Args {
  watch: boolean
}

export const command: string = Command.Default
export const describe: string = 'Creates TypeScript Enums based on JSON files'

export function builder(yargs: Argv<Args>): Argv<Args> {
  return yargs.default('watch', false)
}

export function handler(args: Arguments<Args>): void {
  console.log(args)
}
