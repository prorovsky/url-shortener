var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    siteUrl = 'localhost:3000/',
    charsStr = '1234567890qwertyuiopasdfghjklzxcvbnm'; 

// model
mongoose.connect("mongodb://localhost/test-url");

var linkSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String
});

var Link = mongoose.model('Link', linkSchema);

// file server

app.use(express.static('public'));

// routes

app.get('/new/', function(req, res){
    res.send('info');
});

app.get('/new/:site*', function(req, res){ 
    var newSite = getNewSite(req);
    handleNewSite(newSite, res);
});

app.get('/:redirect', function(req, res){

    var para = req.params.redirect;
    console.log(para)
    Link.findOne({'shortUrl': req.params.redirect}, function(err, link){
        if(err){
            console.error(err);
        } else {
            res.redirect(link.originalUrl);
        }
    });
    // res.send('redirect');

}); 

app.listen(process.env.PORT || 3000, function(){
    console.log('Server started...');
});

// helpers

function getNewSite(req){
    var newSite = {
            originalUrl: '',
            shortUrl: ''
    };
    newSite.originalUrl = req.url.substr(5);
    newSite.shortUrl = siteUrl + randomStr(4, charsStr);
    return newSite; 
}

function handleNewSite(site, res){
    if(validation(site.originalUrl)){
        Link.findOne({'originalUrl': site.originalUrl}, function(err, link){
            if(err){
                console.error(err);
            } else {
                if(link === null){
                    Link.create(site, function(err, link){
                        if(err){
                            console.error(err);
                        } else {
                            console.log('create url');
                            res.json(link);
                        }
                    });
                } else {
                    console.log('find url');
                    res.json(link);
                }
            }
        });
    } else {
        res.send('Sorry, this is not valid url');
    }
}

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