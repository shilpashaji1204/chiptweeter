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
      <p class="tweet-text1"> ${content.text}</p>
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
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [{
    "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
},
{
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1680033989069
  }]
$(document).ready(function () {
    const renderTweets = function (tweets) {
        console.log(tweets);
        for (tweet of tweets) {
            const $tweet = createTweetElement(tweet);

            // Test / driver code (temporary)
            console.log($tweet); // to see what it looks like
            $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
        }
        return;
    }
    renderTweets(tweetData);
        })



