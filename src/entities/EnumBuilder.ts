import { pipe } from 'ramda'
import { FlatJson } from '../types/FlatJson'
import { EnumFile } from '../types/EnumFile'

export const createEnumFile: (json: FlatJson) => EnumFile = pipe()

// get content(): string {
//   if (this.config.enumExportDefault) {
//     return `${this.declaration}\n\nexport default ${this.name};\n`
//   } else {
//     return `export ${this.declaration}\n`
//   }
// }
//
// function get declaration(): string {
//   return `enum ${this.name} {${this.items}}`
// }
//
// function get items(): string {
//   const tab = this.createTab()
//
//   return reduce(
//     this.config.flatJson,
//     (result: string, value: any, key: string) => {
//       const enumKey = upperCamelCase(key)
//       const valueSection = this.createValueSection(value, key)
//
//       return result + `${tab}${enumKey}${valueSection},\n`
//     },
//     '\n'
//   )
// }
//
// function createValueSection(value: any, key: string): string {
//   const enumValue = this.createValue(value, key)
//
//   if (isUndefined(enumValue)) {
//     return ''
//   }
//
//   const encodedValue = this.encodeValue(enumValue)
//   const quotes = this.config.enumValueQuotes
//
//   return ` = ${quotes}${encodedValue}${quotes}`
// }
