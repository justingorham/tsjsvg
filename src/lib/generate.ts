import {ensureDir, writeFile} from 'fs-extra'
import {dirname, join} from 'path'
import * as shell from 'shelljs'
import {GenerateContentParams, generteContent} from './generate-file-content'

export interface GenerateParams {
  pathGlob: string;
  generatedFileName: string;
  fileParams: Omit<GenerateContentParams, 'schema'>;
}

export const generate = async (params: GenerateParams) => {
  const binName = 'ts-json-schema-generator'
  const generatorPath = join(
    dirname(require.resolve(binName)),
    '..',
    'bin',
    binName,
  )
  const generateCommand = `node ${generatorPath} --path ${params.pathGlob}`
  shell.cd(process.cwd())
  const {code, stdout, stderr} = shell.exec(generateCommand)
  if (code !== 0) {
    throw new Error(stderr)
  }
  const fileContent = await generteContent({
    ...params.fileParams,
    schema: stdout,
  })
  await ensureDir(dirname(params.generatedFileName))
  await writeFile(params.generatedFileName, fileContent, 'utf8')
}
