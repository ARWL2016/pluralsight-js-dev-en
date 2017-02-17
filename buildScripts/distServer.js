/* now we are serving up static file from dist/ so we can remove webpack*/

import express from 'express';
import path from  'path';
import open from 'open';
import compression from 'compression';

/*eslint-disable no-console*/

const port = 3000; 
const app = express(); 

app.use(compression()); //enables gzip compression 
app.use(express.static('dist')); 

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html' ));
});

//database mockup API 
app.get('/users', function(req, res) {
    res.json([
        {"id": 1, "firstName": "Bob", "lastName": "Smith"}, 
        {"id": 2, "firstName": "Job", "lastName": "Smith"},
        {"id": 3, "firstName": "Gob", "lastName": "Smith"} 
    ]); 
});

app.listen(port, function(err) {
    if (err) {
        console.log(err); 
    } else {
        open('http://localhost:' + port); 
    }
});
