import {readFile} from 'fs-extra'
import Handlebars from 'handlebars'
import {join} from 'path'

export interface GenerateContentParams {
  defaultsVarName: string;
  definitionKeysTypeName: string;
  modelValidatorClassName: string;
  schema: any;
  schemaVarName: string;
}

export const generteContent = async (params: GenerateContentParams) => {
  const content = await readFile(
    join(__dirname, 'generated-file.ts.hbs'),
    'utf8',
  )
  const template = Handlebars.compile(content)
  return template(params)
}
