const gulp = require( 'gulp' );

const config = require( './config/settings' );

const source = config.paths.source;

module.exports = ( callback ) => {

  console.log( 'Watching source files for changes' );

  /* Watch CSS */
  gulp.watch( [ source.stylus + '**/*.styl' ], [ 'build-css' ] )
    .on( 'change', ( event ) => {
      console.log( 'File ' + event.path + ' was ' + event.type + ', running tasks...' );
    } );

};