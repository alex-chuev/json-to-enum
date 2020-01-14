import { Command } from '../enums/Command'
import { Arguments, Options } from 'yargs'
import { EnumValue } from '../enums/EnumValue'
import { FilenameCase } from '../enums/FilenameCase'
import { Compiler, CompilerConfig } from '../entities/Compiler'
import { watch } from 'chokidar'
import { EnumConfig } from '../interfaces/EnumConfig'
import { existsSync } from 'fs'
import { resolve } from 'path'
import defaults from 'lodash/defaults'
import { JsonFlattenerConfig } from '../entities/JsonFlattener'
import { Logger } from '../entities/Logger'

export interface CompileArgs extends EnumConfig, CompilerConfig, JsonFlattenerConfig {
  watch: boolean
  silent: boolean
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
    defaultDescription: 'false',
    boolean: true,
  },
  silent: {
    alias: 's',
    defaultDescription: 'false',
    boolean: true,
  },
  enumFilenameCase: {
    defaultDescription: FilenameCase.Default,
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

export function handler(args: Arguments<CompileArgs>): void {
  const compile = (file: string) => {
    if (!args.silent) {
      Logger.log(`File ${file} is being processed`)
    }

    new Compiler(file).compile(args)
  }

  if (existsSync(args.config)) {
    try {
      const configFromFile: Partial<EnumConfig & CompilerConfig> = require(resolve(args.config))

      args = defaults(args, configFromFile, {
        watch: false,
        silent: false,
        enumFilenameCase: FilenameCase.Default,
        enumFilenameEnding: '.ts',
        enumValue: EnumValue.Default,
        enumTabs: false,
        enumSpaces: 2,
        enumExportDefault: true,
        enumValueQuotes: "'",
        jsonKeySeparator: '.',
        jsonFlattenArray: false,
      })
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
