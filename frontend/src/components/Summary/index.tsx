import differenceInMinutes from 'date-fns/differenceInMinutes';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInDays } from 'date-fns';

import { useAuth0 } from '../../auth0Spa';
import { Dictionary, Employee, Engagement } from '../../model';
import { fetchEmployee, selectEmployees } from '../../store/employeeSlice';
import {
  fetchEngagements,
  selectEngagement,
} from '../../store/engagementSlice';
import { capitalizeFirstLetter } from '../../utils/string';
import DatePicker from './DatePicker';
import PieChart from './PieChart';
import summaryStyle from './summary.module.scss';
import SpendingAnalysisChart, { Granularity } from './SpendingAnalysisChart';
import { Legend } from './Legend';

const getEmployeeJob = (staffId: number) => (employeeList: Employee[]) =>
  employeeList.find(({ id }) => id === staffId)?.jobTitle;

const calcTimeDifference = (start: Date, end: Date) =>
  Math.round(differenceInMinutes(end, start) / 60);

const getTimesPerJob = (
  employeeList: Employee[],
  engagementList: Engagement[]
) =>
  engagementList.reduce(
    (total: Dictionary<number>, { staffId, start, end }) => {
      const jobTypeIfPresent = getEmployeeJob(staffId)(employeeList);
      if (!jobTypeIfPresent) {
        return total;
      }
      const jobType = capitalizeFirstLetter(jobTypeIfPresent);
      return Object.prototype.hasOwnProperty.call(total, jobType)
        ? {
            ...total,
            [jobType]: total[jobType] + calcTimeDifference(start, end),
          }
        : { ...total, [jobType]: calcTimeDifference(start, end) };
    },
    {}
  );

const getGranularity = (start?: Date, end?: Date) => {
  if (!start || !end) {
    return Granularity.Daily;
  }
  return differenceInDays(end, start) <= 1
    ? Granularity.Hourly
    : Granularity.Daily;
};

const Summary = () => {
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();
  const employeeList = useSelector(selectEmployees);
  const engagementList = useSelector(selectEngagement);
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();
  const data = getTimesPerJob(employeeList, engagementList);

  const setTimes = (start: Date, end: Date) => {
    setStartTime(start);
    setEndTime(end);
  };

  useEffect(() => {
    const getEmployeesAndEngagements = async () => {
      if (startTime && endTime) {
        dispatch(fetchEmployee());
        dispatch(fetchEngagements(startTime, endTime));
      }
    };
    getEmployeesAndEngagements();
  }, [startTime, endTime, getTokenSilently, dispatch]);

  const renderPageBody = () =>
    startTime && endTime ? (
      <>
        <div className={summaryStyle.hourlyBreakdown}>
          <h4>Hourly Breakdown</h4>
          <PieChart
            data={data}
            size={100}
            animationTime={1000}
            radiusRatio={0.75}
            textSize={30}
          />
        </div>
        <div className={summaryStyle.legend}>
          <Legend data={data} />
        </div>
        <div className={summaryStyle.spendingChart}>
          <SpendingAnalysisChart
            minTime={startTime || new Date()}
            maxTime={endTime || new Date()}
            height={300}
            width={600}
            granularity={getGranularity(startTime, endTime)}
          />
        </div>
      </>
    ) : (
      <></>
    );

  return (
    <div className={summaryStyle.summary}>
      <h1 className={summaryStyle.header}> Summary </h1>
      <DatePicker callback={setTimes} />
      {renderPageBody()}
    </div>
  );
};

export default Summary;
