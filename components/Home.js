import React, { useState } from "react";
import LastTweets from "./LastTweets";
import Trends from "./Trends";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";
import { routeBE } from "../route";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  const [tweetText, setTweetText] = useState("");
  const [toggleReload , setToggleReload] = useState(false);

  !user.token && router.push("/");

  const handleTweetSubmit = (e) => {
    if (e.key === "Enter" || e==="onClick") {
      fetch(`${routeBE}/tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: tweetText, token: user.token }),
      })
        .then((response) => response.json())
        .then(() => {
          setTweetText("");
          setToggleReload(!toggleReload)
        });
    }
  };

  const handleOnRemoveTweet = () =>{
    setToggleReload(!toggleReload)
  }

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
                objectFit="cover"
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
            onChange={(e) => setTweetText(e.target.value)}
            onKeyDown={handleTweetSubmit}
            placeholder="Quoi de neuf ?"
            maxLength={280}
          />
          <button
            className={styles.tweetBtn}
            onClick={() => handleTweetSubmit("onClick")}
          >
            Tweet
          </button>
        </div>
        <LastTweets toggleReload={toggleReload} onRemoveTweet={handleOnRemoveTweet}/>
      </div>

      <div className={styles.rightSection}>
        <Trends toggleReload={toggleReload}/>
      </div>
    </div>
  );
};

export default Home;
