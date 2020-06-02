import differenceInMinutes from 'date-fns/differenceInMinutes';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StaffData } from '../../constants/employees';
import { EngagementData } from '../../constants/engagements';
import {
  fetchEngagements,
  selectEngagement,
} from '../../features/engagementSlice';
import { fetchStaff, selectStaff } from '../../features/staffSlice';
import Dictionary from '../../model/common/dictionary';
import { useAuth0 } from '../../react-auth0-spa';
import capitalizeFirstLetter from '../../utils/string';
import DatePicker from './DatePicker';
import PieChart from './PieChart';
import summaryStyle from './summary.module.scss';

const getStaffJob = (staffId: number) => (staffList: StaffData[]) =>
  staffList.find((staff) => staff.id === staffId)?.jobTitle;

const calcTimeDifference = (start: Date, end: Date) =>
  Math.round(differenceInMinutes(end, start) / 60);

const getTimesPerJob = (
  staffList: StaffData[],
  engagementList: EngagementData[]
) =>
  engagementList.reduce(
    (total: Dictionary<number>, { staffId, start, end }) => {
      const jobTypeIfPresent = getStaffJob(staffId)(staffList);
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
  const staffList = useSelector(selectStaff);
  const engagementList = useSelector(selectEngagement);
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();

  const setTimes = (start: Date, end: Date) => {
    setStartTime(start);
    setEndTime(end);
  };

  useEffect(() => {
    const getStaffAndEngagements = async () => {
      const accessToken = await getTokenSilently();
      dispatch(fetchStaff(accessToken));
      dispatch(fetchEngagements(startTime, endTime, accessToken));
    };
    getStaffAndEngagements();
  }, [startTime, endTime, getTokenSilently, dispatch]);

  return (
    <div className={summaryStyle.summary}>
      <h1 className={summaryStyle.header}> Summary </h1>
      <DatePicker callback={setTimes} />
      <div className={summaryStyle.hourlyBreakdown}>
        <h4>Hourly Breakdown</h4>
        <PieChart
          data={getTimesPerJob(staffList, engagementList)}
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
