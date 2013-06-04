(function (window, undefined) {
    if (!window['kp']) {
        window.kp = {}
    }
})(window);
(function ($) {
    $.fn.kpTweets = function () {
        var tweets = new kp.tweets(this)
        $('.previous a').on('click', function (e) {
            tweets.loadTweets(tweets.prev)
            return false
        })
        $('.next a').on('click', function (e) {
            tweets.loadTweets(tweets.next)
            return false
        })
        tweets.loadTweets(1)
        return this
    }
    kp.tweets = function (element) {
        this.element = element
        this.prev = 0
        this.next = 0
    }
    kp.tweets.prototype.templateTweet = function (data) {
        var tweet = '<li class="clearfix">'
        tweet += '<img src="' + data.profile_image_url + '" alt="' + data.from_user_name + '">'
        tweet += '<h4>' + data.from_user_name + '</h4>'
        tweet += '<p>' + data.text + '</p>'
        tweet += '</li>'
        return tweet;
    }
    kp.tweets.prototype.loadTweets = function (page) {
        var self = this
        $.getJSON('/tweets', { 'page': page }, function (data) {
            self.prev = data.prev
            self.next = data.next
            if (!self.prev)
                $('.previous').addClass('disabled')
            else
                $('.previous').removeClass('disabled')
            self.renderTweets(data.tweets)
        }).fail(function () {
            self.renderError()
        })
    }
    kp.tweets.prototype.renderError = function () {
        this.element.html('<li class="nav-header">An error occured</li><li class="alert alert-error"><strong>Oooops!</strong> Something went wrong...</li>')
    }
    kp.tweets.prototype.renderTweets = function (tweets) {
        this.element.html('<li class="nav-header">Tweets about Facebook<span class="pull-right">Page ' + tweets.page + '</span></li>')
        for (var i = 0; i < tweets.results.length; i++) {
            this.element.append(this.templateTweet(tweets.results[i]))
        }
    }
}(jQuery));
$(function () {
    $('#tweets').kpTweets()
});