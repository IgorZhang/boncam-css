const stylus = require( 'stylus' );
const path   = require( 'path' );

module.exports = function( themesFolder, theme ) {
  return function( style ) {
    style.define( 'variables-path', function( $type_folder, $type, $element ) {
      
      return path.resolve( themesFolder, theme, $type_folder.val, $type.val, $element.val + '_variables.styl' );
    } );
  };
};

