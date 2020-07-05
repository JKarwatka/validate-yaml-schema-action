import validateSchema from 'yaml-schema-validator'
const jsyaml = require('js-yaml')
const fs = require('fs');
const glob = require('glob')
const core = require('@actions/core')



const validateYamlFile = (filePath, schema) => {
  console.log('______________________________________________________')
  console.log('FILE: ' + filePath)
  const file = loadYamlFile(filePath)
  console.log('YAML FILE: ');
  console.log(file);
  console.log('VALIDATING: ...')
  const errors = validateSchema(file, {
    schemaPath: schema,
  })

  if (errors.length > 0){
    console.log('ERRORS: ')
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