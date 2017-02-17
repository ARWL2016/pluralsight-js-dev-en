##Building a Javascript Development Environment 

- Pluralsight  
- Cory House  
- Nov 2016  

https://app.pluralsight.com/library/courses/javascript-development-environment/table-of-contents 
https://github.com/ARWL2016/ps-javascript-dev-env 
https://devchat.tv/js-jabber/jsj-247-building-a-development-environment-with-cory-house 

####Technology 
- editorconfig  
- localtunnel 
- npm scripts  
- ESLint http://eslint.org/docs/user-guide/getting-started 
- Mocha (testing framework)  
- Chai (assertion library)   
- JSDOM (virtual DOM simulation for testing) 
- TravisCI https://travis-ci.org/ (Linux platform testing)  
- AppVeyor https://ci.appveyor.com/projects/new (Windows platform testing)  
- whatwg-fetch (window.fetch polyfill) https://www.npmjs.com/package/whatwg-fetch  
- JSON Schema Faker (with faker, chance and regexp)  
- JSON Server  

---
####Localtunnel 
1. `npm install localtunnel -g`  
2. start app 
3. `lt --port 3000`  
4. ngrok is a more secure alternative but requires sign up  

---
####General Notes  
1. This setup runs the app on an express server using webpack-dev-middleware 
2. Hot-reloading is enabled  
3. Bundle.js is built virtually   
4. The webpack build runs babel
5. The srcServer itself is not built, so its ES6 is run using the babel-node  
6. The npm scripts also contain options for a nsp check and localtunnel  
7. The npm scripts make use of the `npm-run-all` and `--parallel` commands  
8. We build into the source and use this while developing - so there is no public folder 
9. `buildScripts` is not like a `build` folder. It is not for the build output, but for utility files which run the build.  
10. The course module on HTTP calls generates the following files: `generateMockData.s`, `mockDataSchema.js`, and the three files in the `api` folder. This module focuses on creating a mock database server so that we can develop and test http requests in a working environment.  
11. `npm run ... -s` - silent mode, reduces terminal output  

####Questions
PROB: Running babel-node directly in the command line doesn't work, but the scripts run ok. 
SOL: This requires a global install of `babel-cli`. Therefore, npm scripts are not actually using the CLI, even if there behaviour mimics this.  

---
####ESLint 
1. Can be configured in `package.json` or `.eslint.rc` - using recommended presets saves time  
2. plugins are available for React, Angular and Node  
3. For a watch function, `eslint-loader` works with webpack and lints on each build. `eslint-watch` is a standalone package that adds a wrapped to eslint with watch functionality. It can also lint all files, not just built files.  
4. Eslint does not work with experimental javascript features - try `babel-lint`. Babel plugins are also needed. 
5. Using `eslint` in the CL rather than the editor make integration with the CI Server easier.  

####Using `eslint-watch` 
1. Create a `.eslintrc.json` file - the `json` extension is now required  
2. add an npm script which defines which files and folders to watch: `"lint": "esw webpack.config.* src buildScripts --color"`
3. add --color to the script for better output  
4. use `/*eslint-disable no-console*/` to disabled a specific rule in a specific file  
5. Use `//eslint-disable-line no-console` to disable a rule on one line only 
6. For a watch function add a script: `"lint-watch": "npm run lint -- --watch"`. This runs the lint with the --watch flag attached  

---
####Setting up Tests 
1. `npm install mocha chai jsdom --save-dev`  
2. Create a `buildScripts/testSetup.js` file. This contains test config information - use ES5 only here   
3. ES6: register babel to transpile before mocha runs in `testSetup.js`  
4. Webpack: disable webpack features which mocha does not understand, such as importing css  
5. add an npm test script: `"test": "mocha --reporter progress buildScripts/testSetup.js \"src/**/*.test.js\""`. The `--reporter progress` flag defines the type of output. Then we list the setup file and the files to test. 
6. Create test files in the same folder as the file to be tested: `file.test.js` 
7. import the assertion library: `import {expect} from 'chai';`  
8. describe our tests  

####Testing the DOM with `jsdom`  
1. install packages as above  
2. import `jsdom` and `expect` into our test file  
3. To bring in our `index.html` for testing, we do not use import (I think because js can only import js files). Instead, use the node `fs` module, and use `const index = fs.readFileSync('./src/index.html', "utf-8");` inside the test function.  
4. To use `jsdom`, we pass the index.html into the jsdom environment: `jsdom.env(index, function(err, window) {}`. 
5. The window param in the callback then gives us the root of the DOM. We can now access any element: `const h1 = window.document.getElementsByTagName('h1')[0];` Remember that the js dom traversal methods will return an array of elements.  
6. In an async function (ie one with a callback), remember to pass in `done` and then call `done()` at the end to tell mocha it is safe to evaluate the tests.  
7. Calling `window.close()` saves memory  

---
####Continuous Integration with TravisCI and AppVeyor 
1. Travis tests our app on Linux and AppVeyor on a Windows platform. They allows us to test our app automatically on commit on another machine. Both work in the same way:
2. Create a `.travis.yml` and an `appVeyor.yml` file to configure the servers. 
3. Commit changes and push to Github 
4. Navigate to the projects page https://ci.appveyor.com/projects/new or https://travis-ci.org/ and select the app and run build. 
5. The CI server will download dependencies, run the build and run any tests, then show some stats and any error messages.  