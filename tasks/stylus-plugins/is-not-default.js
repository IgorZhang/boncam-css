const stylus = require( 'stylus' );
const path   = require( 'path' );

module.exports = function( theme ) {
  return function( style ) {
    style.define( 'is-not-default', function() {
      return theme !== 'default';
    } );
  };
};

