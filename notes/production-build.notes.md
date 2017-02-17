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

---
####Creating a Seperate Bundle for Vendor Libraries  
1. In the webpack production config file, change entry from an array to an object. Assign the index.html link to `main` and a new `src/vendor` file to `vendor`. 
2. Add the `CommonsChunkPlugin` plugin and set `name: 'vendor'`. Now, any files imported into vendor.js will be left out of the main bundle. 
3. Change `output.filename` to `'[name].js'`.  
4. In `vendor.js`, import any libraries that we want in the seperate bundle (chunk).  
5. This method can be used for other bundle-splitting strategies too, such as one bundle for each page of a website.  

---
####Creating Dynamic File name with WebpackMd5Hash  
This package will add a random hash to file names upon build, and also inject this into the index.html reference.  The hash will only change when the file changes. This purpose is to make browser caching more efficient. The user will use cached files until an update is available.  
1. in webpack prod config, import WebpackMd5Hash package  
2. change `output.filename` to `'[name].[chunkhash].js'`  
3. add `new WebpackMd5Hash` to the plugins array  

---
####Generating a Seperate CSS File  
1. In webpack prod config, import `ExtractTextPlugin`  
2. Add plugin: `new ExtractTextPlugin('[name].[contenthash].css')`  
3. Change loader to `loader: ExtractTextPlugin.extract('css?sourceMap')`  
