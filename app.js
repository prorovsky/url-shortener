var express = require('express'),
    app = express();

app.get('/', function(req, res){

});

app.get('/new/', function(req, res){

});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server started...');
});