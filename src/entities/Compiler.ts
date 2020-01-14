import { JsonFlattener } from './JsonFlattener'
import { join, parse, ParsedPath } from 'path'
import { writeFileSync } from 'fs'
import { CompileArgs } from '../commands/compile'
import { EnumBuilder } from './EnumBuilder'
import chalk from 'chalk'
import { Logger } from './Logger'

export interface CompilerConfig {
  input?: string
  outputFolder?: string
  outputFolderCallback?: (parsedPath: ParsedPath) => string
}

export class Compiler {
  constructor(private file: string) {}

  compile(args: CompileArgs): void {
    const flatJson = JsonFlattener.getFlatJson(this.file, args)
    const enumBuilder = new EnumBuilder({
      ...args,
      file: this.file,
      flatJson,
    })

    this.output(args, enumBuilder.fileName, enumBuilder.content)
  }

  private output(config: CompileArgs, fileName: string, content: string): void {
    const folder = this.getOutputFolder(config)
    const path = join(folder, fileName)

    if (!config.silent) {
      Logger.log(`File ${path} has been updated`, chalk.green)
    }

    writeFileSync(path, content, 'utf-8')
  }

  private getOutputFolder(config: CompileArgs): string {
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
