import React from 'react';

const Tweet = ({ tweet, isOwner, onDelete }) => {
  
  
  const handleDelete = () => {
    if (isOwner && window.confirm('Voulez-vous vraiment supprimer ce tweet ?')) {
      onDelete(tweet.id);
    }
  };

  return (
    <div className="tweet">
      <p>{tweet.content}</p>
      <span>{tweet.author}</span>
      <button onClick={() => console.log('Like')}>Like</button>
      {isOwner && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default Tweet;

