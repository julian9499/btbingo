require('marko/node-require');
 
var express = require('express');
var markoExpress = require('marko/express');

const bodyParser = require('body-parser');

var app = express();
 
var path = require('path')
app.use('/assets', express.static(path.join(__dirname, 'files/assets')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(markoExpress()); 

var api = require('./api');
app.use('/api', api);

var bingo_template = require('./files/bingo.marko');
var bingo = require('./bingo/bingo');
app.get('/', function(req, res) {
    res.marko(bingo_template, {
        situations: bingo.situations
    });
});

app.all('*', function(req, res) {
    res.status(204).send('No content.');
})

app.listen(6400, () => console.log('Website listening on port 6400!'));

