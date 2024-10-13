import React from "react";
import Image from "next/image";
import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";

const Tweet = ({
  createdAt,
  authorFirstname,
  authorUsername,
  content,
  isOwner,
  onDeleteTweet,
  onLikeTweet,
  id,
  isLiked,
  nbLikes
}) => {

  const heartStyle = isLiked ? { color: "red" } : { color: "white" };

  function addColorSpanToHashtag(tweet) {
    const hashtagWords = tweet && tweet.match(/#\S*/gi);
    const tweetTab = [];
    let lastStop = 0;
    if (hashtagWords) {
      for (let i = 0; i < hashtagWords.length; i++) {
        const indexOfHashtag = tweet.indexOf(hashtagWords[i]);
        tweetTab.push(tweet.substring(lastStop, indexOfHashtag));
        lastStop = indexOfHashtag + hashtagWords[i].length;
        tweetTab.push(tweet.substring(indexOfHashtag, lastStop));
      }

      tweetTab.push(tweet.substring(lastStop, tweet.length));
    }
    if (!tweetTab.length) return tweet;
    return (
      <div >
        {tweetTab.map((e, i) => {
          const link = `/hashtag/${e.substr(1)}`;
          return i % 2 ? (
            <React.Fragment key={i}>
            <Link href={link}>
              <a className={styles.link}>{e}</a>
            </Link>
            </React.Fragment>
          ) : (
            <span  key={i}>{e}</span>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.tweet}>
      <div className={styles.firstLine}>
        <Image
          src="/twitter-oeuf.jpg"
          height={50}
          width={50}
          alt="profil egg"
          style={{ borderRadius: "50%" }}
        />
        <div className={styles.userInfos}>
          <span>{authorFirstname}</span>
          <span className={styles.secondUserInfo}>
            @{authorUsername} · {moment(createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div className={styles.textContent}>{addColorSpanToHashtag(content)}</div>
      <div className={styles.lastLine}>
        <div>
          <FontAwesomeIcon
            style={heartStyle}
            className={styles.heart}
            onClick={()=>onLikeTweet(id)}
            icon={faHeart}
          />
          <span className={styles.nbLikes}>{nbLikes}</span>
        </div>
        {isOwner && (
          <FontAwesomeIcon
            onClick={()=>onDeleteTweet(id)}
            icon={faTrashCan}
            className={styles.trash}
          />
        )}
      </div>
    </div>
  );
};

export default Tweet;
