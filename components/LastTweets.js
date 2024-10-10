import React from 'react';
import Tweet from './Tweet';

const LastTweets = ({ tweets, user }) => {
  return (
    <div className="last-tweets">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} user={user} />
      ))}
    </div>
  );
};

export default LastTweets;


