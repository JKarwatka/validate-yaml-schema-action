import * as core from '@actions/core'
import * as glob from 'glob'
import * as fs from 'fs'
import { validateYamlFile } from './validateYamlFile'



const validateYamlFilesInDirectory = ({path, schema}) =>{

  const pathStats = fs.lstatSync(path)
  if(pathStats.isDirectory()){
    glob(`${process.env.GITHUB_WORKSPACE}/${path}/**/*.yaml`, {}, (err, files) => {
      files.map(validateYamlFile)
    })

  }
  if(pathStats.isFile()){
    validateFile(path)
  }
}

const main = () =>{
  try {
    console.log(process.env.GITHUB_WORKSPACE)
    const filesToValidate = core.getInput('files-to-validate');
    //TODO
    //check if filesToValidate is and Array with correct structure
    const filesList = JSON.parse(filesToValidate)

    filesList.map(validateYamlFilesInDirectory)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}





