var http = require('http');

var tweetModule = function () {
}
tweetModule.prototype.get_tweets = function (page, callback) {
    var self = this
    var request = http.request({
        host: "search.twitter.com",
        port: 80,
        method: "GET",
        path: "/search.json?q=Facebook&result_type=recent&page=" + page
    })
    .on("response", function (response) {
        var body = "";
        response.on("data", function (data) {
            body += data;
            try {
                var tweets = JSON.parse(body)
                var next = tweets.next_page ? page + 1 : 1
                var prev = tweets.previous_page ? page - 1 : false
                if (tweets.results.length > 0) {
                    callback(null, tweets, next, prev)
                }
            } catch (ex) {
                console.log("waiting for more data chunks...")
            }
        })
    })
    request.end()
}

module.exports = tweetModule;