import { createEnumName } from './createEnumName'
import { enumConfig } from '../../configs/enumConfig'
import { ParsedPath } from 'path'

it('creates enum name without callback', function() {
  delete enumConfig.value.enumNameCallback

  expect(createEnumName('/some/file/path/file-name.type.ext')).toBe('FileNameType')
})

it('creates enum name using callback', function() {
  enumConfig.value.enumNameCallback = (path: ParsedPath) => `CustomValue${path.ext}`

  expect(createEnumName('/some/file/path/file-name.type.ext')).toBe('CustomValue.ext')
})
