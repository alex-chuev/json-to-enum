import { Command } from '../enums/Command'
import { EnumValue } from '../enums/EnumValue'
import { Arguments, Options } from 'yargs'

export interface Args {
  path: string
  glob: string
  enumValue: EnumValue
}

export const command: string = Command.Init
export const describe: string = 'Creates default configuration file'

export const builder: { [key: string]: Options } = {
  path: {
    alias: 'p',
    demandOption: true,
    default: 'json-to-enum.js',
  },
}

export function handler(args: Arguments<Args>): void {
  console.log(args)
}
