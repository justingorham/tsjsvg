@justingorham/tsjsvg
================================================

Typescript json schema and validator generator

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@justingorham/tsjsvg.svg)](https://npmjs.org/package/@justingorham/tsjsvg)
[![Downloads/week](https://img.shields.io/npm/dw/@justingorham/tsjsvg.svg)](https://npmjs.org/package/@justingorham/tsjsvg)
[![License](https://img.shields.io/npm/l/@justingorham/tsjsvg.svg)](https://github.com/justingorham/tsjsvg/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @justingorham/tsjsvg
$ tsjsvg COMMAND
running command...
$ tsjsvg (-v|--version|version)
@justingorham/tsjsvg/1.0.1 win32-x64 node-v12.14.1
$ tsjsvg --help [COMMAND]
USAGE
  $ tsjsvg COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tsjsvg generate`](#tsjsvg-generate)
* [`tsjsvg help [COMMAND]`](#tsjsvg-help-command)

## `tsjsvg generate`

generate schema and validator

```
USAGE
  $ tsjsvg generate

OPTIONS
  -f, --fileName=fileName  Name of the generated file
  -h, --help               show CLI help
  -p, --path=path          The path to the TypeScript source file.

EXAMPLE
  $ tsjsvg generate -p src/models/**/*.ts -f src/model-validator.ts
```

_See code: [src\commands\generate.ts](https://github.com/justingorham/ts-json-schema-validator-generator/blob/v1.0.1/src\commands\generate.ts)_

## `tsjsvg help [COMMAND]`

display help for tsjsvg

```
USAGE
  $ tsjsvg help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src\commands\help.ts)_
<!-- commandsstop -->
