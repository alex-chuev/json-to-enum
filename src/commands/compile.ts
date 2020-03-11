import { Command } from '../enums/Command'
import { Arguments, Options } from 'yargs'
import { EnumValue } from '../enums/EnumValue'
import { FilenameCase } from '../enums/FilenameCase'
import { CompileConfig } from '../types/CompileConfig'
import { mutateConfig } from '../functions/config/mutateConfig'
import { compileAndWatch } from '../functions/compile/compileAndWatch'

export const command: string = Command.Compile
export const describe: string = 'Creates TypeScript Enums based on JSON files'

export const builder: { [key: string]: Options } = {
  input: {
    alias: 'i',
    description: 'Glob pattern for input files',
    string: true,
  },
  outputFolder: {
    alias: 'o',
    string: true,
  },
  config: {
    alias: 'c',
    default: 'json-to-enum.js',
    string: true,
  },
  watch: {
    alias: 'w',
    defaultDescription: 'false',
    boolean: true,
  },
  silent: {
    alias: 's',
    defaultDescription: 'false',
    boolean: true,
  },
  enumFilenameCase: {
    defaultDescription: FilenameCase.Kebab,
    string: true,
  },
  enumFilenameEnding: {
    defaultDescription: '.ts',
    string: true,
  },
  enumValue: {
    defaultDescription: EnumValue.Default,
    string: true,
  },
  enumTabs: {
    defaultDescription: 'false',
    boolean: true,
  },
  enumSpaces: {
    defaultDescription: '2',
    number: true,
  },
  enumExportDefault: {
    defaultDescription: 'true',
    boolean: true,
  },
  enumValueQuotes: {
    defaultDescription: "'",
    string: true,
  },
  jsonKeySeparator: {
    defaultDescription: '.',
    string: true,
  },
  jsonFlattenArray: {
    defaultDescription: 'false',
    boolean: true,
  },
}

export function handler(args: Arguments<CompileConfig>): void {
  mutateConfig(args)
  compileAndWatch(args)
}
