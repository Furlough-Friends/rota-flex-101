import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {
  addDays,
  addMonths,
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import React, { useEffect, useState } from 'react';

import summaryStyle from './summary.module.scss';

interface Props {
  callback: (startTime: Date, endTime: Date) => void;
}

enum Periods {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
}

interface TimeBounds {
  start: Date;
  end: Date;
}

const getTimeBounds = (period: Periods) => (date: Date): TimeBounds => {
  switch (period) {
    case Periods.DAILY:
      return { start: startOfDay(date), end: endOfDay(date) };
    case Periods.WEEKLY:
      return {
        start: startOfWeek(date, { weekStartsOn: 1 }),
        end: endOfWeek(date, { weekStartsOn: 1 }),
      };
    case Periods.MONTHLY:
      return { start: startOfMonth(date), end: endOfMonth(date) };
    default:
      return { start: date, end: date };
  }
};

const addTimePeriods = (period: Periods, number: number) => ({
  start,
  end,
}: TimeBounds) => {
  switch (period) {
    case Periods.DAILY:
      return { start: addDays(start, number), end: addDays(end, number) };
    case Periods.WEEKLY:
      return { start: addWeeks(start, number), end: addWeeks(end, number) };
    case Periods.MONTHLY:
      return { start: addMonths(start, number), end: addMonths(end, number) };
    default:
      return { start, end };
  }
};

const printTimePeriod = (period: Periods) => ({
  start,
  end,
}: TimeBounds): string => {
  switch (period) {
    case Periods.DAILY:
      return format(start, 'dd/MM/y');
    case Periods.WEEKLY:
      return start.getMonth() === end.getMonth()
        ? `${format(start, 'do')}-${format(end, 'do LLLL')}`
        : `${format(start, 'do LLLL')}-${format(end, 'do LLLL')}`;
    case Periods.MONTHLY:
      return format(start, 'LLLL');
    default:
      return '';
  }
};

const DatePicker = ({ callback }: Props) => {
  const [timePeriod, setTimePeriod] = useState(Periods.WEEKLY);
  const [timeBounds, setTimeBounds] = useState(
    getTimeBounds(timePeriod)(new Date())
  );

  const changeTimePeriod = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const period = event.target.value as Periods;
    setTimePeriod(period);
    setTimeBounds(getTimeBounds(period)(timeBounds.start));
  };

  const prevTimePeriod = () => {
    setTimeBounds(addTimePeriods(timePeriod, -1)(timeBounds));
  };

  const nextTimePeriod = () => {
    setTimeBounds(addTimePeriods(timePeriod, 1)(timeBounds));
  };

  useEffect(() => {
    callback(timeBounds.start, timeBounds.end);
  });

  return (
    <div className={summaryStyle.datePicker}>
      <Select value={timePeriod} onChange={changeTimePeriod}>
        <MenuItem value={Periods.DAILY}>{Periods.DAILY}</MenuItem>
        <MenuItem value={Periods.WEEKLY}>{Periods.WEEKLY}</MenuItem>
        <MenuItem value={Periods.MONTHLY}>{Periods.MONTHLY}</MenuItem>
      </Select>
      <div className={summaryStyle.rangeSelector}>
        <button type="button" aria-label="prev-period" onClick={prevTimePeriod}>
          <ChevronLeft />
        </button>
        <span>{printTimePeriod(timePeriod)(timeBounds)}</span>
        <button type="button" aria-label="next-period" onClick={nextTimePeriod}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
