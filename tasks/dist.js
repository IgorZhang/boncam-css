const runSequence  = require( 'run-sequence' );

module.exports = ( callback ) => {
  
  console.info( 'Distributing EPM UI' );
  
  runSequence( 'clean', [ 'build' ], callback );

};