import React, { useState } from 'react';

const Tweet = ({ tweet, user }) => {
  const [likes, setLikes] = useState(tweet.likes);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDelete = () => {
   
    console.log('Tweet supprimé');
  };

  return (
    <div className="tweet">
      <p>{tweet.text}</p>
      <p>Posté par: {tweet.user}</p>
      <button onClick={handleLike}>Like ({likes})</button>
      {tweet.user === user.username && (
        <button onClick={handleDelete}>Supprimer</button>
      )}
    </div>
  );
};

export default Tweet;
