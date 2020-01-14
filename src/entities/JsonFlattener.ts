import { readFileSync } from 'fs'
import json5 from 'json5'
import flatten from 'flat'
import { FlatJson } from '../interfaces/FlatJson'

export interface JsonFlattenerConfig {
  jsonKeySeparator: string
}

export class JsonFlattener {
  static getFlatJson(file: string, { jsonKeySeparator: delimiter }: JsonFlattenerConfig): FlatJson {
    try {
      const content = readFileSync(file, 'utf-8')
      const data = json5.parse(content)

      return flatten(data, { delimiter })
    } catch (e) {
      return {}
    }
  }
}
