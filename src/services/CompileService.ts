import { JsonService } from './JsonService'
import { join, parse, ParsedPath } from 'path'
import { EnumService } from './EnumService'
import { FilenameCase } from '../enums/FilenameCase'
import kebabCase from 'lodash/kebabCase'
import { upperCamelCase } from '../helpers'
import { readFileSync, writeFileSync } from 'fs'
import { CompileArgs } from '../commands/compile'

export interface CompileConfig {
  outputDir: string | null
  createFilename?: (parsedPath: ParsedPath) => string
  case: FilenameCase
}

export class CompileService {
  static compileJsonFile(file: string, args: CompileArgs): void {
    const inputPath = parse(file)
    const text = readFileSync(file, 'utf-8')
    const json = JSON.parse(text)
    const jsonData = JsonService.createJsonData(json)
    const enumContent = EnumService.createEnumContent(jsonData, inputPath, args)
    const outputPath = this.createOutputPath(file, args)

    writeFileSync(outputPath, enumContent, 'utf-8')
  }

  private static createOutputPath(file: string, config: CompileArgs): string {
    const parsedPath = parse(file)
    const dir = config.outputDir || parsedPath.dir
    const filename = config.createFilename
      ? config.createFilename(parsedPath)
      : this.generateFilename(parsedPath, config)

    return join(dir, filename)
  }

  private static generateFilename(parsedPath: ParsedPath, config: CompileArgs): string {
    let name: string

    if (config.case === FilenameCase.Kebab) {
      name = kebabCase(parsedPath.name)
    } else {
      name = upperCamelCase(parsedPath.name)
    }

    return `${name}.ts`
  }
}
