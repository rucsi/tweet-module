var express = require('express');
var tweetModule = require('./modules/tweetModule');

var app = module.exports = express();
app.set('port', process.env.PORT);
app.use(express.static(__dirname + '/views'));

// router
app.use(app.router);
app.get('/', function (req, res) {
    res.sendfile('index.html')
})
app.get('/script.js', function (req, res) {
    res.sendfile('./js/script.js')
})
app.get('/styles.css', function (req, res) {
    res.sendfile('./css/styles.css')
})
app.get('/tweets', function (req, res) {
    var tweet_module = new tweetModule()
    var page = req.query.page || 1
    tweet_module.get_tweets(page, function (err, tweets, next, prev) {
        if (err) throw err
        res.send({
            tweets: tweets,
            next: next,
            prev: prev
        })
    })
})