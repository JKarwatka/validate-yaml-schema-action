import validateSchema from 'yaml-schema-validator'
const jsyaml = require('js-yaml')
const fs = require('fs');
const glob = require('glob')
const core = require('@actions/core')



const validateYamlFile = (filePath, schema) => {
  core.debug('______________________________________________________')
  core.debug('FILE: ' + filePath)
  const file = loadYamlFile(filePath)
  core.debug('YAML FILE: ');
  core.debug(doc);
  core.debug('VALIDATING: ...')

  const errors = validateSchema(file, {
    schemaPath: schema,
  })

  if (errors.length > 0){
    core.debug('ERRORS: ')
    errors.map(core.debug)
    //throw new Error('ERRORS IN YAML FILES!')
  }
}


const loadYamlFile = filePath => jsyaml.safeLoad(fs.readFileSync(filePath, 'utf8'));


const processInputEntry = ({path, schema}) =>{

  const pathStats = fs.lstatSync(path)
  if(pathStats.isDirectory()){
    glob(`${process.env.GITHUB_WORKSPACE}/${path}/**/*.yaml`, {}, (err, files) => {
      files.map(validateYamlFile)
    })

  }
  if(pathStats.isFile()){
    validateFile({path,schema})
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