#!/usr/bin/env node

import yargs from 'yargs'

yargs
  .scriptName('json-to-enum')
  .commandDir('commands')
  .help().argv
