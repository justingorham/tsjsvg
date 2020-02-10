import {Command, flags} from '@oclif/command'
import {generate} from '../lib/generate'

export default class Generate extends Command {
  static description = 'generate schema and validator';

  static examples = [
    `$ tsjsvg generate -p src/models/**/*.ts -f src/model-validator.ts
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-p, --path=VALUE)
    path: flags.string({
      char: 'p',
      description: 'The path to the TypeScript source file.',
    }),
    // flag with a value (-f, --fileName=VALUE)
    fileName: flags.string({
      char: 'f',
      description: 'Name of the generated file',
    }),
    defaultsVarName: flags.string({
      description: 'export to set default validator',
      default: 'defaults',
    }),
    definitionKeysTypeName: flags.string({
      description: 'exported definition keys type name',
      default: 'DefinitionKeys',
    }),
    modelValidatorClassName: flags.string({
      description: 'name of the exported validator class',
      default: 'ModelValidator',
    }),
    schemaVarName: flags.string({
      description: 'exported name of the generated JSON schema',
      default: 'schema',
    }),
  };

  async run() {
    const {flags} = this.parse(Generate)
    if (!flags.path) {
      throw new Error('path flag must be set')
    }
    if (!flags.fileName) {
      throw new Error('fileName flag must be set')
    }
    await generate({
      pathGlob: flags.path,
      generatedFileName: flags.fileName,
      fileParams: {
        defaultsVarName: flags.defaultsVarName,
        definitionKeysTypeName: flags.definitionKeysTypeName,
        modelValidatorClassName: flags.modelValidatorClassName,
        schemaVarName: flags.schemaVarName,
      },
    })
  }
}
