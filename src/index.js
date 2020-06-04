import * as core from '@actions/core'
import * as glob from 'glob'
import * as fs from 'fs'
import { validateYamlFile } from './validateYamlFile'




const validateYamlFilesInDirectory = ({path, schema}) =>{

  const pathStats = fs.lstatSync(path)
  if(pathStats.isDirectory()){
    glob(`${__dirname}/${dirPath}/**/*.yaml`, {}, (err, files) => {
      files.map(validateFile)
    })

  }
  if(pathStats.isFile()){
    validateFile(path)
  }
}

const main = () =>{
  const filesToValidate = core.getInput('files-to-validate');
  //TODO
  //check if filesToValidate is and Array with correct structure

  try {
    filesToValidate.map(validateYamlFilesInDirectory)
  } 
  catch (error) {
    core.setFailed(error.message);
  }

}





