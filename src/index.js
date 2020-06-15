import validateSchema from 'yaml-schema-validator'
const jsyaml = require('js-yaml')
const fs = require('fs');
const glob = require('glob')
const core = require('@actions/core')



const validateYamlFile = (filePath, schema) => {
  core.debug('______________________________________________________')
  console.log('______________________________________________________')
  core.debug('FILE: ' + filePath)
  console.log('FILE: ' + filePath)
  const file = loadYamlFile(filePath)
  core.debug('YAML FILE: ');
  console.log('YAML FILE: ');
  core.debug(file);
  console.log(file);
  core.debug('VALIDATING: ...')
  console.log('VALIDATING: ...')
  const errors = validateSchema(file, {
    schemaPath: schema,
  })

  if (errors.length > 0){
    core.debug('ERRORS: ')
    errors.map(core.debug)
    errors.map(console.log)
    throw new Error('ERRORS IN YAML FILES!')
  }
}


const loadYamlFile = filePath => jsyaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

const withGithubWorkspacePath = path => `${process.env.GITHUB_WORKSPACE}/${path}`

const processInputEntry = ({path, schema}) =>{
  const fullPath = withGithubWorkspacePath(path)
  const fullSchema = withGithubWorkspacePath(schema)
  const pathStats = fs.lstatSync(fullPath)
  if(pathStats.isDirectory()){
    glob(`${fullPath}/**/*.yaml`, {}, (err, files) => {
      files.map(filePath => validateYamlFile(filePath,fullSchema))
    })

  }
  if(pathStats.isFile()){
    validateYamlFile(fullPath,fullSchema)
  }
}


const main = () =>{
  try {
    core.debug('GITHUB_WORKSPACE: ' + process.env.GITHUB_WORKSPACE)
    const filesToValidate = core.getInput('files-to-validate');
    //TODO
    //check if filesToValidate is and Array with correct structure
    const filesList = JSON.parse(filesToValidate)

    filesList.map(processInputEntry)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

main()