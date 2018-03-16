const stylus = require( 'stylus' );
const path   = require( 'path' );

module.exports = function( themesFolder, theme ) {
  return function( style ) {
    style.define( 'overrides-path', function( $type_folder, $type, $element ) {

      const filePath = path.resolve( themesFolder, theme, $type_folder.val, $type.val, $element.val + '_overrides.styl' );

      return filePath;
    } );
  };
};

