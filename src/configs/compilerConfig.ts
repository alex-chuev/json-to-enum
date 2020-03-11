import { MutableConfig } from '../types/MutableConfig'
import { ParsedPath } from 'path'
import { CompilerConfig } from '../types/CompilerConfig'

function outputFolderCallback(path: ParsedPath) {
  return path.dir
}
outputFolderCallback.toString = () => 'path => path.dir'

export const compilerConfig: MutableConfig<CompilerConfig> = Object.freeze({
  value: {
    input: 'src/**/*.json',
    outputFolderCallback,
    outputFolder: '.',
  },
})
