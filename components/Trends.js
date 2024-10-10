import React from 'react';

const Trends = () => {
  const trends = [
    { hashtag: '#React', count: 1200 },
    { hashtag: '#JavaScript', count: 850 },
    { hashtag: '#NextJS', count: 500 }
  ];

  return (
    <div className="trends">
      <h2>Trends</h2>
      <ul>
        {trends.map((trend, index) => (
          <li key={index}>
            {trend.hashtag} - {trend.count} times
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trends;

