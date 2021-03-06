const stylus = require( 'stylus' );
const path   = require( 'path' );

module.exports = function( themesFolder, theme ) {
  return function( style ) {
    style.define( 'overrides-file-exists', function( $type_folder, $type, $element ) {

      const overrides_path = path.resolve( themesFolder, theme, $type_folder.val, $type.val, $element.val + '_overrides.styl' );

      return !!stylus.utils.lookup( overrides_path, [ path.resolve( themesFolder, theme ) ] );
    } );
  };
};
