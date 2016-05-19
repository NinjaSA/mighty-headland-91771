var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var router = express.Router();
var app = express();

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, Authorization, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./config/connection')(config);
require('./config/routes')(router);

app.use('/api', router);

app.listen(config.PORT, function(){
    console.log('NinjaAPP running on port ' + config.PORT);
});
