import * as glob from 'glob'
import * as fs from 'fs'

export const processInputEntry = ({path, schema}) =>{

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