import React from 'react';

const Trends = ({ trends }) => {
  return (
    <div className="trends">
      <h3>Tendances</h3>
      <ul>
        {trends.map((trend, index) => (
          <li key={index}>
            #{trend.hashtag} ({trend.count})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trends;
