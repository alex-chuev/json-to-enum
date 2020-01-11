const upperFirst = require('lodash/upperFirst')
const camelCase = require('lodash/camelCase')

module.exports = {
  input: 'samples/**/*.en.json',
  enumNameCallback: path => upperFirst(camelCase(path.name.replace('.en', 'Message'))),
  enumFilenameCase: 'camel',
  enumFilenameEnding: '.enum.ts',
  enumValue: 'path',
}
