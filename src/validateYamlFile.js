import { loadYamlFile } from './loadYamlFile'
import validateSchema from 'yaml-schema-validator'

export const validateYamlFile = (filePath, schema) => {
  console.log('______________________________________________________')
  console.log('FILE: ' + filePath)
  const file = loadYamlFile(filePath)
  console.log('YAML FILE: ');
  console.log(doc);
  console.log('VALIDATING: ...')

  const errors = validateSchema(file, {
    schemaPath: schema,
  })

  if (errors.length > 0){
    console.log('ERRORS: ')
    errors.map(console.log)
    //throw new Error('ERRORS IN YAML FILES!')
  }
}