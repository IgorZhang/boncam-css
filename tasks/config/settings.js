module.exports = {
  
  banner: [
    '/*!',
    ' * ${pkg.name} - ${pkg.description}',
    ' * @version v${pkg.version} - ${time}',
    ' * @link ${pkg.homepage}',
    ' * Copyright (C) 1997-present BON Corporation All rights reserved.',
    ' */',
    ''
  ].join('\n'),
  
  entry: {
    fileName       : 'epm-ui'
  },
  
  paths: {
    source: {
      stylus      : 'stylus/',
      components  : 'stylus/components',
      themes      : 'stylus/themes',
      // icons       : 'node_modules/@font-awesome/',
      normalize   : 'node_modules/normalize.css/'
    },
    output: {
      packaged    : 'dist/',
      css         : 'dist/css/'
    },
    clean         : 'dist/'
  },
  
  filenames: {
    css : 'epm-ui'
  },

  defaultConfigs: {
    theme: 'default',
    fontUnit: 'rem'
  }
  
};
