// gulp plugins
const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );
const stylus = require( 'gulp-stylus' );
const merge = require( 'ordered-merge-stream' );
const concat = require( 'gulp-concat' );
const minifyCSS = require( 'gulp-clean-css' );
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const postcss    = require('gulp-postcss');
const remtopx = require('postcss-remtopx');
const autoprefixer = require( 'autoprefixer' );

// stylus custom plugins
const customDesignToken = require( '../stylus-plugins/custom-design-token' );
const customDSFileExists = require( '../stylus-plugins/custom-ds-file-exists' );
const customColorList = require( '../stylus-plugins/custom-color-list' );
const customCLFileExists = require( '../stylus-plugins/custom-cl-file-exists' );
const overrideOptional = require( '../stylus-plugins/overrides-file-exists' );
const variableOptional = require( '../stylus-plugins/variables-file-exists' );
const defaultVariablesPath = require( '../stylus-plugins/default-variables-path' );
const variablesPath = require( '../stylus-plugins/variables-path' );
const isNotDefault = require( '../stylus-plugins/is-not-default' );
const overridesPath = require( '../stylus-plugins/overrides-path' );

// settings
const settings = require( '../config/settings' );
const tasks = require( '../config/tasks' );

const header = require( '../libs/header' );

const entry = settings.entry;
const source = settings.paths.source;
const output = settings.paths.output;
const names = settings.filenames;

const themepath = settings.paths.source.themes;
const defaultConfigs = settings.defaultConfigs;

// 样式编译
const buildCss = ( filePath, theme ) => {
  const config = require( '../libs/config' ).config;

  const arr = [];

  const uiStream = gulp.src( filePath )
      .pipe( stylus() );

  const normalizeCss = gulp.src( source.normalize + 'normalize.css' );

  const stream = ( isRem, name ) => {
    console.info( 'Building EPM UI CSS: ' + name.uncompressedName );

    return merge( [ normalizeCss, uiStream ] )
      .pipe( concat( name.uncompressedName ) )
      .pipe( header() )
      .pipe( postcss( [ autoprefixer( { cascade: true, remove: true } ) ] ) )
      .pipe( gulpif( !isRem, postcss( [ remtopx( { rootFontSize: 16 } ) ] ) ) )
      .pipe( gulp.dest( output.css ) )
      .pipe( sourcemaps.init() )
      .pipe( minifyCSS( tasks.minify ) )
      .pipe( header() )
      .pipe( rename( name.compressedName ) )
      .pipe( sourcemaps.write( '.' ) )
      .pipe( gulp.dest( output.css ) );
  };

  const fontUnit = config.fontUnit;

  if ( typeof fontUnit === 'undefined' || typeof config.fontUnit === 'string' ) {
    const fu = typeof fontUnit === 'undefined' ? defaultConfigs.fontUnit : fontUnit;

    arr.push( stream( fu === 'rem', getCssName( theme, fu === 'rem' ) ) );
  } else if ( Array.isArray( fontUnit ) ) {

    fontUnit.forEach( ( fu ) => {
      arr.push( stream( fu === 'rem', getCssName( theme, fu === 'rem' ) ) );
    } );
    
  }

  return arr;
};

// 组装样式文件名称
const getCssName = ( theme, isRem ) => {
  const basicName = names.css;
  const themeName = theme === 'default' ? basicName : basicName + '.' + theme;
  const pxName = isRem ? themeName : themeName + '.px';

  return {
    uncompressedName: pxName + '.css',
    compressedName: pxName + '.min.css'
  };
};

// 根据 主题 设置进行编译
const buildTheme = ( filePath ) => {
  const config = require( '../libs/config' ).config;

  if ( !config.themes || typeof config.themes === 'string' ) {
    const theme = config.themes ? config.themes : defaultConfigs.theme;
    return buildCss( filePath, theme );

  } else if ( Array.isArray( config.themes ) ) {
    let arr = [];
    
    config.themes.forEach( ( theme ) => {
      arr = arr.concat( buildCss( filePath, theme ) );
    } );

    return arr;
  }
};

module.exports = () => {

  const stylusSourceFilePath = `${ source.stylus }${ entry.fileName }.styl`;

  console.log('....', stylusSourceFilePath);

  buildTheme( stylusSourceFilePath );

};
