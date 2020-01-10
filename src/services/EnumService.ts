import { JsonData } from '../interfaces/JsonData'
import { EnumValue } from '../enums/EnumValue'
import { upperCamelCase } from '../helpers'
import { ParsedPath } from 'path'

export interface EnumConfig {
  value: EnumValue
  tabs: boolean
  spaces: number
  exportDefault: boolean
}

export class EnumService {
  static createEnumContent(data: JsonData, parsedPath: ParsedPath, config: EnumConfig): string {
    const enumName = upperCamelCase(parsedPath.name)
    let content = `enum ${enumName} {\n`

    data.forEach(item => {
      const keysSeparatedByDot = item.keys.join('.')
      const enumKey = upperCamelCase(keysSeparatedByDot)
      const enumValue: string = config.value === EnumValue.Value ? item.value : keysSeparatedByDot
      const encodedEnumValue = enumValue.toString().replace("'", "\\'")
      const tab = config.tabs ? '\t' : ' '.repeat(config.spaces || 2)

      content += `${tab}${enumKey} = '${encodedEnumValue}',\n`
    })

    content += `}\n`

    if (config.exportDefault) {
      content = `export ${content}`
    } else {
      content += `\nexport default ${enumName};\n`
    }

    return content
  }
}
