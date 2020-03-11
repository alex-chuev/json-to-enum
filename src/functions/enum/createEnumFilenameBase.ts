import { call, ifElse } from 'ramda'
import { enumConfig } from '../../configs/enumConfig'
import { FilenameCase } from '../../enums/FilenameCase'
import { upperCamelCase } from '../string/upperCamelCase'
import kebabCase from 'lodash/kebabCase'

export const createEnumFilenameBase: (name: string) => string = ifElse(
  () => enumConfig.value.enumFilenameCase === FilenameCase.Camel,
  upperCamelCase,
  kebabCase
)
