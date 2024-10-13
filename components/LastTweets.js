import React from "react";
import Tweet from "./Tweet";
import styles from "../styles/LastTweet.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const LastTweets = (props) => {
  const user = useSelector((state) => state.user.value);
  const [tweets, setTweets] = useState([]);
  console.log(tweets)
  useEffect(() => {
    fetchTweet();
  }, [props.hashtag, props.toggleReload]);

  const fetchTweet = () => {
    fetch("http://localhost:3000/tweets")
      .then((response) => response.json())
      .then((data) => {
        setTweets(
          props.hashtag
            ? data.filter((e) => {
                if (e.hashtags) {
                  return e.hashtags.includes("#" + props.hashtag);
                }
              })
            : data
        );
      });
  };

  const handleDeleteTweet = (tweetId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce tweet ?")) {
      fetch(`http://localhost:3000/tweets/${tweetId}`, {
        method: "DELETE",
      }).then(() => {
        fetchTweet();
        props.onRemoveTweet();
      });
    }
  };

  const handleLikeTweet = (tweetId) => {
    fetch(`http://localhost:3000/tweets/${tweetId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userToken: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchTweet();
      });
  };

  return (
    <div className={styles.lastTweet}>
      {tweets.map((tweet, i) => (
        <React.Fragment key={i}>
          <Tweet
            isOwner={tweet.author.token === user.token}
            onDeleteTweet={handleDeleteTweet}
            id={tweet._id}
            content={tweet.content}
            authorFirstname={tweet.author.firstname}
            authorUsername={tweet.author.username}
            createdAt={tweet.createdAt}
            isLiked={tweet.likes.some(e=>e.token === user.token)}
            nbLikes={tweet.likes.length}
            onLikeTweet={handleLikeTweet}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default LastTweets;
