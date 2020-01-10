import { Command } from '../enums/Command'
import { Arguments, Argv } from 'yargs'
import { EnumConfig } from '../services/EnumService'
import { EnumValue } from '../enums/EnumValue'
import { FilenameCase } from '../enums/FilenameCase'
import { CompileConfig, CompileService } from '../services/CompileService'
import glob from 'glob'

export interface CompileArgs extends EnumConfig, CompileConfig {
  watch: boolean
  input: string
}

export const command: string = Command.Compile
export const describe: string = 'Creates TypeScript Enums based on JSON files'

export function builder(yargs: Argv<CompileArgs>): Argv<CompileArgs> {
  return yargs
    .positional('input', {
      alias: 'i',
      default: './*.json',
    })
    .positional('outputDir', {
      alias: 'o',
      default: null,
    })
    .positional('config', {
      alias: 'c',
      default: 'json-to-enum.js',
    })
    .positional('tabs', {
      alias: 't',
      default: false,
    })
    .positional('spaces', {
      alias: 's',
      default: 2,
    })
    .positional('exportDefault', {
      alias: 'e',
      default: true,
    })
    .positional('value', {
      alias: 'v',
      default: EnumValue.Path,
    })
    .positional('case', {
      default: FilenameCase.Kebab,
    })
}

export function handler(args: Arguments<CompileArgs>): void {
  if (args.input) {
    glob.sync(args.input).forEach(file => {
      CompileService.compileJsonFile(file, args)
    })
  }
}
