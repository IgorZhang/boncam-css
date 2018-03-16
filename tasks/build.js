"use strict";
const runSequence  = require( 'run-sequence' );

module.exports = ( callback ) => {
  
  console.info( 'Building EPM UI' );
  
  let tasks = [];
  
  tasks.push( 'build-css' );
  // tasks.push( 'build-assets' );
  
  runSequence( tasks, callback );

};
