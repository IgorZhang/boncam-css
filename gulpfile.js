const gulp        = require( 'gulp' );

// watch for file changes and build
const watch       = require('./tasks/watch');

// build all files
const build       = require( './tasks/build' );
const buildCSS    = require( './tasks/build/css' );
// utility tasks
const clean       = require( './tasks/clean' );

// distribution tasks
const dist        = require( './tasks/dist' );


/* Tasks */
gulp.task( 'default', [ 'build' ] );

gulp.task( 'watch', watch );

gulp.task( 'build', build );
gulp.task( 'build-css', buildCSS );

gulp.task( 'clean', clean );

gulp.task( 'dist', dist );
