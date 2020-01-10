import { Command } from '../enums/Command'
import { EnumValue } from '../enums/EnumValue'
import { Arguments, Argv } from 'yargs'

export interface Args {
  path: string
  glob: string
  enumValue: EnumValue
}

export const command: string = Command.Init
export const describe: string = 'Creates configuration file'

export function builder(yargs: Argv<Args>): Argv<Args> {
  return yargs
}

export function handler(args: Arguments<Args>): void {
  console.log(args)
}
