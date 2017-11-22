var app  = require('express')(),
    bodyParser = require('body-parser'); 

app.use( bodyParser.json() );  // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

const openApi = require('./routes/open.routes');

global.db = require('./config/config');
global.model = require('./models');

app.use('/',openApi);

//start Server
var server = app.listen(3001,function(){
	console.log("Listening to port %s",server.address().port);
});