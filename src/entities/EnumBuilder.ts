import { upperCamelCase } from '../helpers'
import isUndefined from 'lodash/isUndefined'
import { parse } from 'path'
import toString from 'lodash/toString'
import kebabCase from 'lodash/kebabCase'
import { EnumValue } from '../enums/EnumValue'
import { JsonItem } from '../interfaces/JsonItem'
import { EnumConfig } from '../interfaces/EnumConfig'
import { FilenameCase } from '../enums/FilenameCase'

export interface EnumBuilderConfig extends EnumConfig {
  file: string
  jsonItems: JsonItem[]
}

export class EnumBuilder {
  name: string

  constructor(private config: EnumBuilderConfig) {
    this.name = this.createName()
  }

  get fileName(): string {
    return `${this.fileNameBase}${this.config.enumFilenameEnding}`
  }

  get fileNameBase(): string {
    switch (this.config.enumFilenameCase) {
      case FilenameCase.Camel:
        return upperCamelCase(this.name)
      default:
      case FilenameCase.Kebab:
        return kebabCase(this.name)
    }
  }

  get content(): string {
    if (this.config.enumExportDefault) {
      return `${this.declaration}\n\nexport default ${this.name};\n`
    } else {
      return `export ${this.declaration}\n`
    }
  }

  private get declaration(): string {
    return `enum ${this.name} {${this.items}}`
  }

  private get items(): string {
    const tab = this.createTab()

    return this.config.jsonItems.reduce((result: string, item: JsonItem) => {
      const key = this.createKey(item)
      const valueSection = this.createValueSection(item)

      return result + `${tab}${key}${valueSection},\n`
    }, '\n')
  }

  private createValueSection(item: JsonItem): string {
    const value = this.createValue(item)

    if (isUndefined(value)) {
      return ''
    }

    const encodedValue = this.encodeValue(value)
    const quotes = this.config.enumQuotes

    return ` = ${quotes}${encodedValue}${quotes}`
  }

  private encodeValue(value: string): string {
    const quotes = this.config.enumQuotes

    return toString(value).replace(quotes, `\\${quotes}`)
  }

  private createTab(): string {
    return this.config.enumTabs ? '\t' : ' '.repeat(this.config.enumSpaces)
  }

  private createKey(item: JsonItem): string {
    return upperCamelCase(item.keys.join())
  }

  private createValue(item: JsonItem): string | undefined {
    switch (this.config.enumValue) {
      case EnumValue.Path:
        return this.createPathValue(item)
      case EnumValue.Value:
        return item.value
      case EnumValue.None:
      default:
        return undefined
    }
  }

  private createPathValue(item: JsonItem): string {
    return item.keys.join(this.config.enumPathValueSeparator)
  }

  private createName(): string {
    const path = parse(this.config.file)

    return this.config.enumNameCallback ? this.config.enumNameCallback(path) : upperCamelCase(path.name)
  }
}
