const stylus = require( 'stylus' );
const path   = require( 'path' );

module.exports = function( themesFolder, theme ) {
  return function( style ) {
    style.define( 'custom-color-list', function() {
      
      return path.resolve( themesFolder, theme, 'design-tokens', 'color-list.styl');
    } );
  };
};

