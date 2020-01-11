import { Command } from '../enums/Command'
import { Arguments, Options } from 'yargs'
import { EnumValue } from '../enums/EnumValue'
import { FilenameCase } from '../enums/FilenameCase'
import { Compiler, CompilerConfig } from '../entities/Compiler'
import { watch } from 'chokidar'
import { EnumConfig } from '../interfaces/EnumConfig'
import { existsSync } from 'fs'
import { resolve } from 'path'

export interface CompileArgs extends EnumConfig, CompilerConfig {
  watch: boolean
  config: string
}

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
    default: false,
    boolean: true,
  },
  enumFilenameCase: {
    default: FilenameCase.Kebab,
    string: true,
  },
  enumFilenameEnding: {
    default: '.ts',
    string: true,
  },
  enumValue: {
    default: EnumValue.Path,
    string: true,
  },
  enumTabs: {
    default: false,
    boolean: true,
  },
  enumSpaces: {
    default: 2,
    number: true,
  },
  enumExportDefault: {
    default: true,
    boolean: true,
  },
  enumPathValueSeparator: {
    default: '.',
    string: true,
  },
  enumValueQuotes: {
    default: "'",
    string: true,
  },
}

export function handler(args: Arguments<CompileArgs>): void {
  const compile = (file: string) => new Compiler(file).compile(args)

  if (existsSync(args.config)) {
    try {
      const configFromFile: Partial<EnumConfig & CompilerConfig> = require(resolve(args.config))

      args = {
        ...configFromFile,
        ...args,
      }
    } catch (e) {}
  }

  if (args.input) {
    watch(args.input, {
      persistent: args.watch,
    })
      .on('add', file => compile(file))
      .on('change', file => compile(file))
  }
}
