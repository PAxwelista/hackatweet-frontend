import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Tweet from './Tweet'; 
import './Home.css'; 

const Home = () => {
  const user = useSelector((state) => state.user); 
  const [tweetText, setTweetText] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleTweetSubmit = () => {
    if (tweetText.trim()) {
      
      const newTweet = {
        id: Date.now(), 
        text: tweetText,
        user: user.username, 
        createdAt: new Date().toISOString(),
      };

      setTweets((prevTweets) => [...prevTweets, newTweet]); 
      setTweetText(''); 
    }
  };

  useEffect(() => {
    
    const fetchTweets = async () => {
      
      const fetchedTweets = [
        { id: 1, text: 'Ceci est un tweet!', user: 'Alice', createdAt: '2024-10-10T10:00:00Z' },
        { id: 2, text: 'Un autre tweet!', user: 'Bob', createdAt: '2024-10-10T10:05:00Z' },
      ];
      setTweets(fetchedTweets); 
    };

    fetchTweets(); 
  }, []);

  return (
    <div className="home">
      <header>
        <h1>Bienvenue, {user?.username || 'Invité'}</h1> {}
      </header>
      <textarea
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
        placeholder="Quoi de neuf ?"
        maxLength={280} 
      />
      <button onClick={handleTweetSubmit}>Tweeter</button>
      <div>
        <h2>Derniers Tweets</h2>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Home;




