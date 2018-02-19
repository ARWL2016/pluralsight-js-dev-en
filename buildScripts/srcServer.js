import express from 'express';
import path from 'path';
import open from 'open';
//ES6 version to test babel-node
import webpack from 'webpack'; //module
import config from '../webpack.config.dev'; //config file

/*eslint-disable no-console*/

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, //shows bundle information
    publicPath: config.output.publicPath
}));

/* any references to the root '/' will be handled by this func
 ** path.join() - joins strings into a path, adding / where needed
 ** __dirname - directory of current script 
 ** this func declares routing
 */
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

//database mockup API 
app.get('/users', function(req, res) {
    res.json([
        { "id": 1, "firstName": "Bob", "lastName": "Smith" },
        { "id": 2, "firstName": "Job", "lastName": "Smith" },
        { "id": 3, "firstName": "Gob", "lastName": "Smith" }
    ]);
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});