import React from "react";
import styles from "../styles/Trends.module.css";
import Link from "next/link";

const Trends = () => {
  const trends = [
    { hashtag: "React", count: 1200 },
    { hashtag: "JavaScript", count: 850 },
    { hashtag: "NextJS", count: 500 },
  ];
  return (
    <div className={styles.main}>
      <span className={styles.title}>Trends</span>
      <div className={styles.trends}>
        {trends.map((trend, index) => (
          <div key={index}>
          <Link href={{pathname : `/hashtag/${trend.hashtag}`}}>
            <div className={styles.trend}>
              <span>#{trend.hashtag}</span>
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
