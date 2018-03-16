const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path')

const userConfig = yaml.safeLoad( fs.readFileSync( path.resolve( 'config.yml' ), 'utf8' ) );

module.exports.config = userConfig;