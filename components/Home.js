import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Tweet from './Tweet'; 
import styles from '../styles/Home.module.css'; 

const Home = () => {
  const user = useSelector((state) => state.user.value); 
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
        {
          id: 1,
          content: "Hello World! #test #cool pas mal #dernierTest",
          author: "user1",
          nbLike: 4,
          authorFirstname: "Bob",
          authorUsername: "Dylan",
          creationDate : new Date("2024-02-01")
        },
        { id: 2, content: "React is awesome", author: "user2", nbLike: 4 },
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




