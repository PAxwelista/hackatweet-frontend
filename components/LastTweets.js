import React from 'react';
import Tweet from './Tweet';
import styles from "../styles/LastTweet.module.css"
const LastTweets = ({ tweets, user,onDeleteTweet}) => {

    return (
    <div className={styles.lastTweet}>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          isOwner={tweet.author.token === user.token}
          onDeleteTweet={onDeleteTweet}
        />
      ))}
    </div>
  );
};

export default LastTweets;