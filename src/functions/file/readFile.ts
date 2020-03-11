import { FilePath } from '../../types'
import { readFileSync } from 'fs'

export const readFile = (file: FilePath): string => readFileSync(file, 'utf-8')
