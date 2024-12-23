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

const Hashtag = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const [hashtagInput, setHashtagInput] = useState(props.hashtag);
  const [toggleReload , setToggleReload] = useState(false);
  !user.token && router.push("/");

  useEffect(()=>{
    setHashtagInput(props.hashtag)
  },[props.hashtag])

  const handleHashtagChange = (e) => {
    setHashtagInput(e.target.value);
  };

  const handleHashtagSubmit = (e) => {
    if (e.code === "Enter" && hashtagInput.length > 0) {
      // empêche de valider si l'inpu est vide
      router.push(`/hashtag/${removeHashtag(hashtagInput)}`);
    }
  };

  function addHashtag(word) {
    if (!word) {
      return "";
    } else if (word[0] != "#") {
      return "#" + word;
    }
    return word;
  }
  function removeHashtag(word) {
    if (!word) {
      return "";
    } else if (word[0] === "#") {
      return word.substr(1);
    }
    return word;
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
                height={50}
                width={50}
                alt="profil egg"
                style={{ borderRadius: "50%" }}
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
            value={addHashtag(hashtagInput)}
            onChange={handleHashtagChange}
            onKeyDown={handleHashtagSubmit}
          />
        </div>
        <LastTweets hashtag={props.hashtag} onRemoveTweet={()=>setToggleReload(!toggleReload)}/>
      </div>

      <div className={styles.rightSection}>
        <Trends toggleReload={toggleReload}/>
      </div>
    </div>
  );
};

export default Hashtag;
