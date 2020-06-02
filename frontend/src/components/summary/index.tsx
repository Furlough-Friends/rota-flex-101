import differenceInMinutes from 'date-fns/differenceInMinutes';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEmployee, selectEmployees } from '../../features/employeeSlice';
import {
  fetchEngagements,
  selectEngagement,
} from '../../features/engagementSlice';
import { Dictionary, Employee, Engagement } from '../../model';
import { useAuth0 } from '../../react-auth0-spa';
import { capitalizeFirstLetter } from '../../utils/string';
import DatePicker from './DatePicker';
import PieChart from './PieChart';
import summaryStyle from './summary.module.scss';

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

const Summary = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const employeeList = useSelector(selectEmployees);
  const engagementList = useSelector(selectEngagement);
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();

  const setTimes = (start: Date, end: Date) => {
    setStartTime(start);
    setEndTime(end);
  };

  useEffect(() => {
    const getEmployeesAndEngagements = async () => {
      const accessToken = await getTokenSilently();
      dispatch(fetchEmployee(accessToken));
      dispatch(fetchEngagements(startTime, endTime, accessToken));
    };
    getEmployeesAndEngagements();
  }, [startTime, endTime, getTokenSilently, dispatch]);

  return (
    <div className={summaryStyle.summary}>
      <h1 className={summaryStyle.header}> Summary </h1>
      <DatePicker callback={setTimes} />
      <div className={summaryStyle.hourlyBreakdown}>
        <h4>Hourly Breakdown</h4>
        <PieChart
          data={getTimesPerJob(employeeList, engagementList)}
          size={100}
          animationTime={1000}
          radiusRatio={0.75}
          textSize={30}
        />
      </div>
    </div>
  );
};

export default Summary;
