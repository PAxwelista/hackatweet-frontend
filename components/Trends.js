import React from "react";
import styles from "../styles/Trends.module.css";
import Link from "next/link";
import { useState,useEffect } from "react";

const Trends = () => {

  const [trends , setTrends] = useState([])
  useEffect(()=>{
    fetch("http://localhost:3000/tweet/trends")
      .then(response=>response.json())
      .then(data=>setTrends(data.map(e=>{return {hashtag : e._id , count : e.count}})))
  },[])

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
      <span className={styles.title}>Trends</span>
      <div className={styles.trends}>
        {trends.map((trend, index) => (
          <div key={index}>
          <Link href={{pathname : `/hashtag/${removeHashtag(trend.hashtag)}`}}>
            <div className={styles.trend}>
              <span>{trend.hashtag}</span>
              <span className={styles.textNbTweet}>{trend.count} Tweets</span>
            </div>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trends;
