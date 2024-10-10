import React, { useState, useEffect } from 'react';
import LastTweets from './LastTweets';
import Trends from './Trends';

const Home = ({ user }) => {
  const [tweetText, setTweetText] = useState('');
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    
    fetchTweets();
  }, []);

  const fetchTweets = () => {
    const mockTweets = [
      { id: 1, content: "Hello World!", author: "user1" },
      { id: 2, content: "React is awesome", author: "user2" }
    ];
    setTweets(mockTweets);
  };

  
  const handleTweetChange = (e) => {
    const text = e.target.value;
    if (text.length <= 280) {
      setTweetText(text);
    }
  };

  
  const handleTweetSubmit = () => {
    if (validateTweet(tweetText)) {
      const newTweet = {
        id: Date.now(),
        content: tweetText,
        author: user.username
      };
      setTweets([newTweet, ...tweets]);
      setTweetText('');
    } else {
      console.error("Le tweet n'est pas valide.");
    }
  };

  
  const validateTweet = (text) => {
    if (!text.trim()) {
      alert("Le tweet ne peut pas être vide");
      return false;
    }
    if (text.length > 280) {
      alert("Le tweet dépasse les 280 caractères");
      return false;
    }
    return true;
  };

  return (
    <div className="home">
      <div className="left-section">
        <div className="logo" onClick={() => window.location.reload()}>Logo</div>
        <div className="user-info">
          <span>{user.username}</span>
          <button onClick={() => console.log('Logout')}>Logout</button>
        </div>
      </div>

      <div className="middle-section">
        <textarea
          value={tweetText}
          onChange={handleTweetChange}
          placeholder="What's happening?"
          maxLength={280}
        />
        <button onClick={handleTweetSubmit}>Tweet</button>
        <LastTweets tweets={tweets} user={user} onTweetDelete={setTweets} />
      </div>

      <div className="right-section">
        <Trends />
      </div>
    </div>
  );
};

export default Home;



