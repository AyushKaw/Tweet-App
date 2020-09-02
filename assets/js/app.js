//variables
var tweetList = document.querySelector('#tweet-list');


//event listeners

eventListeners();

function eventListeners() {
    document.querySelector('#form').addEventListener('submit', newTweet);

    tweetList.addEventListener('click', removeDom);

    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}



//functions

function newTweet(e) {
    e.preventDefault();

    const tweet = document.getElementById("tweet").value;

    var li = document.createElement("li");

    const removeBtn = document.createElement('a');

    removeBtn.textContent = 'X';

    removeBtn.classList = 'remove-tweet';

    li.textContent = tweet;

    li.appendChild(removeBtn);

    tweetList.appendChild(li);

    addTweetLocalStorage(tweet);

    alert('Tweet Added');
}

function removeDom(e) {

    if(e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    removeTweetLocalStorage(e.target.parentElement.textContent);
}

function addTweetLocalStorage(tweet) {

    let tweets = getTweetsFromStorage();

    tweets.push(tweet);

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage() {
    
    let tweets;

    const tweetsLS = localStorage.getItem('tweets');

    if(tweetsLS === null) {
        tweets = [];
    }
    else {
        tweets = JSON.parse(tweetsLS);
    }

    return tweets;
}

function localStorageOnLoad() {

    let tweets = getTweetsFromStorage();

    tweets.forEach(function(tweet) {

    var li = document.createElement("li");

    const removeBtn = document.createElement('a');

    removeBtn.textContent = 'X';

    removeBtn.classList = 'remove-tweet';

    li.textContent = tweet;

    li.appendChild(removeBtn);

    tweetList.appendChild(li);

    });
}

function removeTweetLocalStorage(tweet) {
    
    let tweets = getTweetsFromStorage();

    const tweetDelete = tweet.substring(0, tweet.length-1);

    tweets.forEach(function(tweetLS, index) {
        if(tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}