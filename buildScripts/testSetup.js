//not transpiled - use es5 

//register babel to run before tests
require('babel-register')(); 

//Disable webpack features Mocha cannot understand - treat it like an empty obj 
require.extensions['.css'] = function() {}; 
