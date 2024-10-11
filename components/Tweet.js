import React from "react";
import Image from "next/image";
import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";

const Tweet = ({
  tweet,
  isOwner,
  onDelete,
}) => {
  const handleDelete = () => {
    if (
      isOwner &&
      window.confirm("Voulez-vous vraiment supprimer ce tweet ?")
    ) {
      onDelete(tweet.id);
    }
  };
  

  function addColorSpanToHashtag(tweet) {
  const hashtagWords = tweet && tweet.match(/#[a-z]*/gi);
  const tweetTab = []
  let lastStop = 0
  if (hashtagWords) {
    for (let i = 0; i <hashtagWords.length; i++) {
      const indexOfHashtag = tweet.indexOf(hashtagWords[i]);
      tweetTab.push(tweet.substring(lastStop,indexOfHashtag))
      lastStop = indexOfHashtag+hashtagWords[i].length
      tweetTab.push(tweet.substring(indexOfHashtag,lastStop) )
      
    }
    
    tweetTab.push(tweet.substring(lastStop , tweet.length))
    console.log(tweetTab)
  }

    return<div>{tweetTab.map((e,i)=>{
       return (i%2 ?<span  className={styles.colorSpan}>{e}</span> : <span>{e}</span>)
    })}</div> 
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
          <span>{tweet.authorFirstname}</span>
          <span className={styles.secondUserInfo}>
            @{tweet.authorUsername} · {moment(tweet.creationDate).fromNow()}
          </span>
        </div>
      </div>
      <p>{addColorSpanToHashtag(tweet.content)}</p>
      <div className={styles.lastLine}>
        <div>
          <FontAwesomeIcon
            className={styles.heart}
            onClick={() => console.log("Like")}
            icon={faHeart}
          />
          <span className={styles.nbLikes}>{tweet.nbLike}</span>
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
