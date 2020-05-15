import React, { useState } from 'react';
import DatePicker from './DatePicker';

import summaryStyle from './summary.module.scss';

const Summary = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const setTimes = (start: Date, end: Date) => {
    setStartTime(start);
    setEndTime(end);
  };

  return (
    <div className={summaryStyle.summary}>
      <h1 className={summaryStyle.header}> Summary </h1>
      <DatePicker callback={setTimes} />
      <p>
        {' '}
        Hi, I&apos;m just a paragraph, but my dream is to become a pie chart! I
        would show the data between{' '}
      </p>
      <p>{startTime.toString()}</p>
      <p> and </p>
      <p> {endTime.toString()}</p>
    </div>
  );
};

export default Summary;
