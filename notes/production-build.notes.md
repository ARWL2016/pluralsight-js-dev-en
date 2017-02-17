####Production Build 
This setup is to create a production build on our *local machine*. There is a further step to actually deploy the app. 
1. We accomplish this with three extra files: `build.js`, `webpack.config.prod.js`, and `distServer.js`.  
2. `webpack.config.prod.js`: change the output `file.path` to `dist`. Import webpack. Add webpack plugins to minify the js and remove duplicate npm packages.  Set `devtool: 'source-map'` - this is a full featured source map recommended for production.  
3. `build.js`: this file actually runs the new webpack config. 
4. `distServer.js`. The serves static files from the dist folder. It is a c copy of `srcServer` with some key changes: 1. remove references to webpack and webpack middleware (webpack has finished its work building our bundle before we serve it). 2. set `app.use(express.static('dist')`. Change the `sendFile()` function path from `src` to `dist`. 4. import compression and add to middleware with `app.use(comression());` - this enables gzip. 

####Running the Production Build 
We use for extra npm scripts: 
1. `"clean-dist": "rimraf ./dist && mkdir dist",` - removes and replaces dist folder   
2. `"prebuild": "npm-run-all clean-dist test lint"`   
3. `"build": "babel-node buildScripts/build.js"` - runs the build   
4. `"postbuild": "babel-node buildScripts/distServer.js"` - runs the server to open the app  

####Dynamically Injecting index.html  
The above process does not add `index.html` to dist. But this can be automated: 
1. In the production config (but we can also use these options inthe dev config) `import HtmlWebpackPlugin from 'html-webpack-plugin';`  
2. Configure the config by specifying the template (ie the src file) and `inject: true`.  
3. Remove the script src tags from `index.html`  
4. Extra config is available for the HtmlWebpackPlugin  
