
import React, { useEffect, useState } from 'react';

interface Props {
  timestamp: string;
}

const TimeElapsedComponent: React.FC<Props> = ({ timestamp }) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const calculateElapsedTime = () => {
      const now = new Date();
      const createdTime = new Date(timestamp);
      const timeDifference = now.getTime() - createdTime.getTime();

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let elapsedTimeString = '';

      if (days > 0) {
        elapsedTimeString = `${days} ${days === 1 ? 'day' : 'days'} ago`;
      } else if (hours > 0) {
        elapsedTimeString = `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else if (minutes > 0) {
        elapsedTimeString = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else {
        elapsedTimeString = 'Just now';
      }

      setElapsedTime(elapsedTimeString);
    };

    calculateElapsedTime();

    // Update elapsed time every minute
    const intervalId = setInterval(calculateElapsedTime, 60000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <div>{elapsedTime}</div>;
};

export default TimeElapsedComponent;
