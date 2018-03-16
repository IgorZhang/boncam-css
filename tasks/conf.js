"use strict";
const runSequence  = require( 'run-sequence' );

module.exports = ( callback ) => {

  console.info( 'Building EPM UI Conf' );

  runSequence( 'clean', 'build-conf', 'build', callback );

};