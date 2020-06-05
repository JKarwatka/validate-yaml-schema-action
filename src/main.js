import * as core from '@actions/core'
import { processInputEntry } from 'processInputEntry'

export const main = () =>{
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