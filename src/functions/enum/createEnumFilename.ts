import { concat } from 'ramda'
import { enumConfig } from '../../configs/enumConfig'

export const createEnumFilename: (base: string) => string = concat(enumConfig.value.enumFilenameEnding)
