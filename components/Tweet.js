import React from "react";
import Image from "next/image";
import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { useState ,useEffect } from "react";

const Tweet = ({ tweet, isOwner, onDeleteTweet }) => {
  const user = useSelector((state) => state.user.value);

  const [isLiked , setIsLiked] = useState("")
 
  useEffect(()=>{
    fetch(`http://localhost:3000/tweet/isLiked/${tweet._id}/${user.token}`)
    .then(response=>response.json())
    .then(data=>setIsLiked(data.isLiked))
  },[isLiked])

  const handleDelete = () => {
    if (
      isOwner &&
      window.confirm("Voulez-vous vraiment supprimer ce tweet ?")
    ) {
      fetch(`http://localhost:3000/tweet/tweets/${tweet._id}`, {
        method: "DELETE",
      }).then(() => onDeleteTweet(tweet._id));
    }
  };

  const handleLike = () => {
    fetch(`http://localhost:3000/tweet/tweets/${tweet._id}/${user.token}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(data => setIsLiked(data.liked));
  };

  const heartStyle = isLiked ? { color: "red" } : { color: "white" };

  function addColorSpanToHashtag(tweet) {
    const hashtagWords = tweet && tweet.match(/#[a-z]*/gi);
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
      <div>
        {tweetTab.map((e, i) => {
          return i % 2 ? (
            <span className={styles.colorSpan}>{e}</span>
          ) : (
            <span>{e}</span>
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
          <span>{tweet.author.firstname}</span>
          <span className={styles.secondUserInfo}>
            @{tweet.author.username} · {moment(tweet.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <p>{addColorSpanToHashtag(tweet.content)}</p>
      <div className={styles.lastLine}>
        <div>
          <FontAwesomeIcon
            style={heartStyle}
            className={styles.heart}
            onClick={() => handleLike()}
            icon={faHeart}
          />
          <span className={styles.nbLikes}>{tweet.likes.length}</span>
        </div>
        {isOwner && (
          <FontAwesomeIcon
            onClick={handleDelete}
            icon={faTrashCan}
            className={styles.trash}
          />
        )}
      </div>
    </div>
  );
};

export default Tweet;
