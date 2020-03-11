import { ParsedPath } from 'path'

export type CompilerConfig = {
  input?: string
  outputFolder?: string
  outputFolderCallback?: (parsedPath: ParsedPath) => string
}
