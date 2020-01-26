import {writeFile, ensureDir} from 'fs-extra'
import * as shell from 'shelljs'
import {generateFileContent} from './generate-file-content'
import {dirname, join} from 'path'

export interface GenerateParams {
  pathGlob: string;
  generatedFileName: string;
}

export const generate = async (params: GenerateParams) => {
  const binName = 'ts-json-schema-generator'
  const generatorPath = join(
    dirname(require.resolve(binName)),
    '..',
    'bin',
    binName
  )
  const generateCommand = `node ${generatorPath} --path ${params.pathGlob}`
  shell.cd(process.cwd())
  const {code, stdout, stderr} = shell.exec(generateCommand)
  if (code !== 0) {
    throw new Error(stderr)
  }
  const fileContent = generateFileContent(stdout)
  await ensureDir(dirname(params.generatedFileName))
  await writeFile(params.generatedFileName, fileContent, 'utf8')
}
