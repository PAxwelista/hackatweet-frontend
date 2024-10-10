import React, { useState, useEffect } from "react";
import LastTweets from "./LastTweets";
import Trends from "./Trends";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Hashtag.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const [hashtagInput, setHashtagInput] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchTweets();
  }, []);

  !user.token && router.push("/");

  const fetchTweets = () => {
    const mockTweets = [
      { id: 1, content: "Hello World!", author: "user1" },
      { id: 2, content: "React is awesome", author: "user2" },
    ];
    setTweets(mockTweets);
  };

  const handleHashtagChange = (e) => {
    const text = e.target.value;
    if (text.length <= 280) {
      setHashtagInput(text);
    }
  };

  const handleHashtagSubmit = (e) => {
    if (e.code ==="Enter"){
        // ici il faut changer l'url de la page  : hashtag/hello
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.leftSection}>
        <div className={styles.returnLink}>
          <Link href="/home">
            <Image
              src={"/ReverseLogoTwitter.png"}
              height={100}
              width={100}
              alt="reverse twitter logo"
            />
          </Link>
        </div>
        <div className={styles.footLeftSection}>
          <div className={styles.userInfos}>
            <div className={styles.profilPicture}>
              <Image
                src="/twitter-oeuf.jpg"
                height={50}
                width={50}
                alt="profil egg"
                style={{borderRadius:"50%"}}
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
          <span className={styles.title}>Hashtag</span>
          <input
            className={styles.input}
            value={hashtagInput}
            onChange={handleHashtagChange}
            onKeyDown={handleHashtagSubmit}
          />
        </div>
        <LastTweets tweets={tweets} user={user} onTweetDelete={setTweets} />
      </div>

      <div className={styles.rightSection}>
        <Trends />
      </div>
    </div>
  );
};

export default Hashtag;
