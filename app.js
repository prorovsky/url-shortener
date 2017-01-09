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

app.get('/new/:site*', function(req, res){ 
    newSite = {
        originalUrl: "",
        shortUrl: ""
    };
    
    newSite.originalUrl = req.url.substr(5);
    newSite.shortUrl = siteUrl + randomStr(4, charsStr); 

    // urls.push(newSite);
    // res.json(urls);

    // if(validation(newSite.originalUrl)){ // validation
    //     res.send('true');
    // } else {
    //     res.send('false');
    // }

    // redirect = 'https://gmail.com';
    // res.redirect(redirect); // редирект на другой сайт
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

function validation(urlLink){
    // from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    
    return regex.test(urlLink);
}