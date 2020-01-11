import { Command } from '../enums/Command'
import { Arguments, Options } from 'yargs'
import { EnumValue } from '../enums/EnumValue'
import { FilenameCase } from '../enums/FilenameCase'
import { Compiler, CompilerConfig } from '../entities/Compiler'
import glob from 'glob'
import { EnumConfig } from '../interfaces/EnumConfig'

export interface CompileArgs extends EnumConfig, CompilerConfig {
  watch: boolean
  input: string
}

export const command: string = Command.Compile
export const describe: string = 'Creates TypeScript Enums based on JSON files'

export const builder: { [key: string]: Options } = {
  input: {
    alias: 'i',
    demandOption: true,
  },
  outputFolder: {
    alias: 'o',
  },
  config: {
    alias: 'c',
    default: 'json-to-enum.js',
  },
  enumFilenameCase: {
    default: FilenameCase.Kebab,
  },
  enumFilenameEnding: {
    default: '.ts',
  },
  enumValue: {
    default: EnumValue.Path,
  },
  enumTabs: {
    default: false,
  },
  enumSpaces: {
    default: 2,
  },
  enumExportDefault: {
    default: true,
  },
  enumPathValueSeparator: {
    default: '.',
  },
  enumQuotes: {
    default: "'",
  },
}

export function handler(args: Arguments<CompileArgs>): void {
  if (args.input) {
    glob.sync(args.input).forEach(file => {
      new Compiler(file).compile(args)
    })
  }
}
