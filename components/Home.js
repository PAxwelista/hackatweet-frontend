import React, { useState } from "react";
import LastTweets from "./LastTweets";
import Trends from "./Trends";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { logout } from "../reducers/user";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [tweetText, setTweetText] = useState('');
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tweet/tweets")
      .then((response) => response.json())
      .then(data => setTweets(data));
  });

  const handleTweetChange = (e) => {
    setTweetText(e.target.value);
  };

  const handleTweetSubmit = (e) => {
    if (e.key === "Enter" && tweetText.trim()) {
      const newTweet = {
        id: Date.now(),
        content: tweetText,
        author: user.username,
        nbLike: 0,
        creationDate: new Date(),
      };
      setTweets([newTweet, ...tweets]);
      setTweetText('');
    }
  };

  const handleTweetPost = () => {
    if (tweetText.trim()) {
      const newTweet = {
        id: Date.now(),
        content: tweetText,
        author: user.username,
        nbLike: 0,
        creationDate: new Date(),
      };
      setTweets([newTweet, ...tweets]);
      setTweetText('');
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.leftSection}>
        <div className={styles.returnLink}>
          <Link href="/home">
            <a>
              <Image
                src={"/ReverseLogoTwitter.png"}
                alt="reverse twitter logo"
                height={100}
                width={100}
              />
            </a>
          </Link>
        </div>
        <div className={styles.footLeftSection}>
          <div className={styles.userInfos}>
            <div className={styles.profilPicture}>
              <Image
                src="/twitter-oeuf.jpg"
                alt="profil egg"
                height={50}
                width={50}
              />
            </div>
            <div className={styles.userNames}>
              <span className={styles.name}>{user.firstname}</span>
              <span className={styles.name}>@{user.username}</span>
            </div>
          </div>
          <button
            className={styles.logoutBtn}
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      </div>

      <div className={styles.middleSection}>
        <div className={styles.header}>
          <span className={styles.title}>Home</span>
          <textarea
            className={styles.textarea}
            value={tweetText}
            onChange={handleTweetChange}
            onKeyDown={handleTweetSubmit}
            placeholder="Quoi de neuf ?"
            maxLength={280}
          />
          <button className={styles.tweetBtn} onClick={handleTweetPost}>
            Tweet
          </button>
        </div>
        <LastTweets tweets={tweets} user={user} onTweetDelete={setTweets} />
      </div>

      <div className={styles.rightSection}>
        <Trends />
      </div>
    </div>
  );
};

export default Home;











