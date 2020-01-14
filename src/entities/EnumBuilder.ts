import { upperCamelCase } from '../helpers'
import isUndefined from 'lodash/isUndefined'
import { parse } from 'path'
import toString from 'lodash/toString'
import kebabCase from 'lodash/kebabCase'
import reduce from 'lodash/reduce'
import { EnumValue } from '../enums/EnumValue'
import { EnumConfig } from '../interfaces/EnumConfig'
import { FilenameCase } from '../enums/FilenameCase'
import { FlatJson } from '../interfaces/FlatJson'

export interface EnumBuilderConfig extends EnumConfig {
  file: string
  flatJson: FlatJson
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

    return reduce(
      this.config.flatJson,
      (result: string, value: any, key: string) => {
        const enumKey = upperCamelCase(key)
        const valueSection = this.createValueSection(value, key)

        return result + `${tab}${enumKey}${valueSection},\n`
      },
      '\n'
    )
  }

  private createValueSection(value: any, key: string): string {
    const enumValue = this.createValue(value, key)

    if (isUndefined(enumValue)) {
      return ''
    }

    const encodedValue = this.encodeValue(enumValue)
    const quotes = this.config.enumValueQuotes

    return ` = ${quotes}${encodedValue}${quotes}`
  }

  private encodeValue(value: string): string {
    const quotes = this.config.enumValueQuotes

    return toString(value).replace(quotes, `\\${quotes}`)
  }

  private createTab(): string {
    return this.config.enumTabs ? '\t' : ' '.repeat(this.config.enumSpaces)
  }

  private createValue(value: any, key: string): string | undefined {
    switch (this.config.enumValue) {
      case EnumValue.Path:
        return key
      case EnumValue.Value:
        return value
      case EnumValue.None:
      default:
        return undefined
    }
  }

  private createName(): string {
    const path = parse(this.config.file)

    return this.config.enumNameCallback ? this.config.enumNameCallback(path) : upperCamelCase(path.name)
  }
}
