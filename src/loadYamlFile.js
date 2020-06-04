const jsyaml = require('js-yaml')
const fs = require('fs');

export const loadYamlFile = filePath => jsyaml.safeLoad(fs.readFileSync(filePath, 'utf8'));