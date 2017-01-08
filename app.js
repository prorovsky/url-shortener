var express = require('express'),
    app = express(),
    siteUrl = 'https://prorovsky/',
    charsStr = '1234567890qwertyuiopasdfghjklzxcvbnm'; 

var urlLink = {
    originalUrl: "http://gmail.com",
    shortUrl: ""
};

var urls = [];

app.use(express.static('public'));

app.get('/new/', function(req, res){
    res.send('info');
});

app.get('/new/:site', function(req, res){

    urlLink.shortUrl = siteUrl + randomStr(4, charsStr); 
    res.json(urlLink);

});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server started...');
});

function randomStr(length, chars){
    var result = '';
    for(var i = 0; i < length; i++){
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}