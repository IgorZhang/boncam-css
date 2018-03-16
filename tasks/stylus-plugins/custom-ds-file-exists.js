const stylus = require( 'stylus' );
const path   = require( 'path' );

module.exports = function( themesFolder, theme ) {
  return function( style ) {
    style.define( 'custom-ds-file-exists', function() {

      const overrides_path = path.resolve( themesFolder, theme, 'design-tokens', 'global_variables.styl' );

      return !!stylus.utils.lookup( overrides_path, [ path.resolve( themesFolder, theme ) ] );
    } );
  };
};
