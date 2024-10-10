import React from 'react';
import Tweet from './Tweet';

const LastTweets = ({ tweets, user, onTweetDelete }) => {

  
  const handleDelete = (id) => {
    const updatedTweets = tweets.filter(tweet => tweet.id !== id);
    onTweetDelete(updatedTweets);
  };

  return (
    <div className="last-tweets">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweet={tweet}
          isOwner={tweet.author === user.username}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default LastTweets;





