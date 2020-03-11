import { concat } from 'ramda'
import { enumConfig } from '../../configs/enumConfig'

export const createEnumExport: (base: string) => string = concat(enumConfig.value.enumFilenameEnding)
