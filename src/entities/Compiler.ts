import { JsonParser } from './JsonParser'
import { join, parse, ParsedPath } from 'path'
import { writeFileSync } from 'fs'
import { CompileArgs } from '../commands/compile'
import { EnumBuilder } from './EnumBuilder'

export interface CompilerConfig {
  outputFolder?: string
  outputFolderCallback?: (parsedPath: ParsedPath) => string
}

export class Compiler {
  constructor(private file: string) {}

  compile(args: CompileArgs): void {
    const jsonParser = new JsonParser(this.file)
    const enumBuilder = new EnumBuilder({
      ...args,
      file: this.file,
      jsonItems: jsonParser.items,
    })

    this.output(args, enumBuilder.fileName, enumBuilder.content)
  }

  private output(config: CompilerConfig, fileName: string, content: string): void {
    const folder = this.getOutputFolder(config)
    const path = join(folder, fileName)

    writeFileSync(path, content, 'utf-8')
  }

  private getOutputFolder(config: CompilerConfig): string {
    const parsedPath = parse(this.file)

    if (config.outputFolderCallback) {
      return config.outputFolderCallback(parsedPath)
    } else if (config.outputFolder) {
      return config.outputFolder
    } else {
      return parsedPath.dir
    }
  }
}