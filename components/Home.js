import React, { useState } from 'react';
import LastTweets from './LastTweets';
import Trends from './Trends';


const Home = ({ user, tweetsData, trendsData }) => {
  const [tweetText, setTweetText] = useState('');
  const [tweets, setTweets] = useState(tweetsData);

  const handleTweetChange = (e) => {
    if (e.target.value.length <= 280) {
      setTweetText(e.target.value);
    }
  };

  const handleTweetSubmit = () => {
    if (tweetText.trim()) {
      const newTweet = {
        id: tweets.length + 1,
        text: tweetText,
        user: user.username,
        likes: 0
      };
      setTweets([newTweet, ...tweets]);
      setTweetText('');
    }
  };

  return (
    <div className="home-page">
      <div className="left-section">
        <button onClick={() => window.location.reload()}>Logo</button>
        <div>Utilisateur: {user.username}</div>
        <button>Logout</button>
      </div>
      
      <div className="middle-section">
        <textarea 
          value={tweetText} 
          onChange={handleTweetChange} 
          placeholder="What's happening?"
        />
        <button onClick={handleTweetSubmit}>Tweet</button>
        <LastTweets tweets={tweets} user={user} />
      </div>
      
      <div className="right-section">
        <Trends trends={trendsData} />
      </div>
    </div>
  );
};

export default Home;

