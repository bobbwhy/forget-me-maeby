
require('@babel/register')(
  { 
    extensions: ['.js', '.jsx', '.es6']
  }
);

require('./core-test.js');
// require('./method-build-test');

