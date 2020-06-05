import { loadYamlFile } from './loadYamlFile'
import validateSchema from 'yaml-schema-validator'
import * as core from '@actions/core'

export const validateYamlFile = (filePath, schema) => {
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