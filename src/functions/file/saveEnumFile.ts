import { EnumFile } from '../../types/EnumFile'
import { writeFileSync } from 'fs'

export const saveEnumFile = (file: EnumFile) => {
  writeFileSync(file.path, file.content, 'utf-8')
}
