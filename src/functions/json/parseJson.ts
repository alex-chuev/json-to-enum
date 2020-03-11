import { FileContent, JsonObject } from '../../types'
import { parse } from 'json5'

export const parseJson: (content: FileContent) => JsonObject = parse
