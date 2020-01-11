# json-to-enum

CLI tool for TypeScript Enum files generation from JSON files

## The Goal

The main goal is to have a convenient tool for working with JSON translation files in TypeScript projects,
which are often used by various i18n libraries, for example i18next.
 
But some other use case may appear, therefore, the tool provides some flexibility in its
configuration.

## Installation

### Local

```
npm install --save-dev json-to-enum
```

or

```
yarn add --dev json-to-enum
```

### Global

```
yarn global add json-to-enum
```

or

```
npm install --global json-to-enum
```

## Usage

You can use the tool by passing all settings through arguments:

```
json-to-enum --watch --input locales/**/*.json
```

## Example

For instance, we have some JSON file with the next content:

```
{
  "nav": {
    "home": "Home",
    "about": "About",
    "contacts": "Contacts"
  }
}
```

By calling `json-to-enum --input some-file.json` we will get the next Enum file:

```
enum SomeFile {
  NavHome = 'nav.home',
  NavAbout = 'nav.about',
  NavContacts = 'nav.contacts',
}

export default SomeFile
```

You can make some customization of the output using configuration.

By calling `json-to-enum --input some-file.json --enumValue value` values of the resulting Enum will be such as in
the source JSON file:

```
enum SomeFile {
  NavHome = 'Home',
  NavAbout = 'About',
  NavContacts = 'Contacts',
}

export default SomeFile
```

## Configuration file

Also you can create configuration file for more detailed configuration:

```
json-to-enum init
```

This command will create configuration file with the next content:

```
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');

module.exports = {
  input: 'src/**/*.json',
  outputFolderCallback: path => path.dir,
  outputFolder: '.', // will be ignored because outputFolderCallback is specified
  enumNameCallback: path => upperFirst(camelCase(path.base)),
  enumFilenameCase: 'kebab',
  enumFilenameEnding: '.ts',
  enumValue: 'path',
  enumValueQuotes: "'",
  enumPathValueSeparator: '.',
  enumTabs: false,
  enumSpaces: 2,
  enumExportDefault: true,
};
```

## Watch Mode

If you pass `--watch`, `-w` argument, the tool will watch changes of source files.
