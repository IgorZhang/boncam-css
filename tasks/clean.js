const del    = require( 'del' );

const config = require( './config/settings' );
const tasks  = require( './config/tasks' );

module.exports = ( callback ) => {

  console.info( 'Cleaning EPM UI dist' );
  
  return del( [ config.paths.clean ], tasks.del, callback );

};