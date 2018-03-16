const stylus = require( 'stylus' );
const path   = require( 'path' );

module.exports = function( themesFolder, theme ) {
  return function( style ) {
    style.define( 'custom-design-token', function() {
      
      return path.resolve( themesFolder, theme, 'design-tokens', 'global_variables.styl');
    } );
  };
};

