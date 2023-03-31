/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function (tweet) {
    const { user, content, created_at } = tweet;
    const $tweet = $(` <article class="tweet-box">
    <header class="tweet-header">
      <div class="tweet-author">
        <img src=${user.avatars}  class="tweet-avatar">
        <h3 class="tweet-author-name">${user.name}</h3>
      </div>
      <p class="tweet-author-username">${user.handle}</p>
    </header>
    <div class="tweet-content">
      <p class="tweet-text1"> ${escape(content.text)}</p>
    </div>
    <div class="new-tweetline1"></div>
    <output name="counter1" class="counter1" for="tweet-text1">${created_at}</output>
    <footer class="tweet-footer">
      <i class="far fa-flag tweet-icon"></i>
      <i class="fas fa-retweet tweet-icon"></i>
      <i class="far fa-heart tweet-icon"></i>
    </footer>
  </article>`)
    return $tweet
}

const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

$(document).ready(function () {

    const loadTweets = function () {
        const $button = $('.new-tweet__button');
        $button.on('click', function () {
            console.log('Button clicked, performing ajax call ..');
        });

        $.ajax({
            method: "GET",
            url: "/tweets",
            type: "json",
            success: function (tweets) {
                renderTweets(tweets);
            }
        });
    };

    $('form').on('submit', function (event) {
        event.preventDefault();
        $('.error_message').hide();
        console.log($(this).serialize());
        const $tweetText = $(this).find("textarea");
        const tweetContent = $tweetText.val().trim();

        if (!tweetContent) {
            $('.error_message').text("Tweet content cannot be empty!").slideDown();
            return;
        }

        if (tweetContent.length > 140) {
            $('.error_message').text("Tweet content is too long.").slideDown();
            return;
        }

        const dataObj = { text: tweetContent };

        $.ajax({
            method: "POST",
            url: "/tweets",
            type: "application/json",
            data: dataObj,
            success: function () {
                loadTweets();
                $tweetText.val("");
            }
        });
    });


    const renderTweets = function (tweets) {
        console.log(tweets);
        for (tweet of tweets) {
            const $tweet = createTweetElement(tweet);
            const timeAgo = timeago.format(tweet.created_at);
            $tweet.find('.counter1').text(timeAgo);
            // Test / driver code (temporary)
            console.log($tweet); // to see what it looks like
            $('#tweets-container').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
        }
        return;
    }
    // renderTweets(tweetData);
    loadTweets();
});



