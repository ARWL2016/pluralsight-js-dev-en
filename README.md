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

---
####Localtunnel 
1. `npm install localtunnel -g`  
2. start app 
3. `lt --port 3000`  
4. ngrok is a more secure alternative but requires sign up  

####General Notes  
1. This setup runs the app on an express server using webpack-dev-middleware 
2. Hot-reloading is enabled  
3. Bundle.js is built virtually   
4. The webpack build runs babel
5. The srcServer itself is not built, so its ES6 is run using the babel-node  
6. The npm scripts also contain options for a nsp check and localtunnel  
7. The npm scripts make use of the `npm-run-all` and `--parallel` commands  
8. We build into the source and use this while developing - so there is no public folder  

####Questions
PROB: Running babel-node directly in the command line doesn't work, but the scripts run ok. 
SOL: This requires a global install of `babel-cli`. Therefore, npm scripts are not actually using the CLI, even if there behaviour mimics this.  

####ESLint 
1. Can be configured in `package.json` or `.eslint.rc` - using recommended presets saves time  
2. plugins are available for React, Angular and Node  
3. For a watch function, `eslint-loader` works with webpack and lints on each build. `eslint-watch` is a standalone package that adds a wrapped to eslint with watch functionality. It can also lint all files, not just built files.  
4. Eslint does not work with experimental javascript features - try `babel-lint`. Babel plugins are also needed. 
5. Using `eslint` in the CL rather than the editor make integration with the CI Server easier.  

####Using `eslint-watch` 
1. Create a `.eslintrc.json` file - the `json` extension is now required  
2. add an npm script which defines which files and folders to watch   