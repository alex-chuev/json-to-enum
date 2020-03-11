import { EnumFile } from '../../types/EnumFile'
import { compilerConfig } from '../../configs/compilerConfig'
import { parse } from 'path'

function getOutputFolder(enumFile: EnumFile): string {
  const { outputFolderCallback, outputFolder } = compilerConfig.value

  const parsedPath = parse(file)

  if (outputFolderCallback) {
    return outputFolderCallback(parsedPath)
  } else if (outputFolder) {
    return outputFolder
  } else {
    return parsedPath.dir
  }
}
