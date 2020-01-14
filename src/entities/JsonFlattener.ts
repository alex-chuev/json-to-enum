import { readFileSync } from 'fs'
import json5 from 'json5'
import flatten from 'flat'
import { FlatJson } from '../interfaces/FlatJson'
import { Logger } from './Logger'
import chalk from 'chalk'
import { CompileArgs } from '../commands/compile'

export interface JsonFlattenerConfig {
  jsonKeySeparator: string
  jsonFlattenArray: boolean
}

export class JsonFlattener {
  static getFlatJson(file: string, args: CompileArgs): FlatJson {
    try {
      const content = readFileSync(file, 'utf-8')
      const data = json5.parse(content)

      return flatten(data, {
        delimiter: args.jsonKeySeparator,
        safe: !args.jsonFlattenArray,
      })
    } catch (e) {
      if (!args.silent) {
        Logger.log(`Error parsing JSON file ${file}`, chalk.yellow)
      }

      return {}
    }
  }
}
