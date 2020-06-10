import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  isBefore,
  isAfter,
  eachHourOfInterval,
  addHours,
  addDays,
  eachDayOfInterval,
} from 'date-fns';
import * as d3 from 'd3';
import { differenceInHours } from 'date-fns/esm';
import { Engagement, Employee } from '../../model';
import { selectEngagement } from '../../store/engagementSlice';
import { selectEmployees } from '../../store/employeeSlice';

export enum Granularity {
  Daily = 'DAILY',
  Hourly = 'HOURLY',
}

interface Interval {
  start: Date;
  end: Date;
}

interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface Props {
  minTime: Date;
  maxTime: Date;
  granularity: Granularity;
  width: number;
  height: number;
}

const engagementFilter = (start: Date, end: Date) => (
  engagement: Engagement
): boolean =>
  !isAfter(engagement.start, end) && !isBefore(engagement.end, start);

const truncateEngagement = (start: Date, end: Date) => (
  engagement: Engagement
): Engagement => {
  const truncatedStart = isBefore(engagement.start, start)
    ? start
    : engagement.start;
  const truncatedEnd = isAfter(engagement.end, end) ? end : engagement.end;
  return { ...engagement, start: truncatedStart, end: truncatedEnd };
};

const getSpending = (employeeList: Employee[]) => (
  engagement: Engagement
): number => {
  const assignedEmployee = employeeList.find(
    employee => employee.id === engagement.staffId
  );
  if (!assignedEmployee) {
    return 0;
  }
  return (
    differenceInHours(engagement.end, engagement.start) *
    assignedEmployee.hourlyRate
  );
};

const getTotalSpending = (
  engagements: Engagement[],
  employees: Employee[]
) => ({ start, end }: Interval): number =>
  engagements
    .filter(engagementFilter(start, end))
    .map(truncateEngagement(start, end))
    .map(getSpending(employees))
    .reduce((prev, current) => prev + current, 0);

const createTimeSteps = ({ minTime, maxTime, granularity }: Props): Date[] => {
  switch (granularity) {
    case Granularity.Hourly:
      return eachHourOfInterval({ start: minTime, end: maxTime });
    case Granularity.Daily:
      return eachDayOfInterval({ start: minTime, end: maxTime });
    default:
      return [];
  }
};

const timeStepToInterval = ({ granularity }: Props) => (
  date: Date
): Interval => {
  switch (granularity) {
    case Granularity.Hourly:
      return { start: date, end: addHours(date, 1) };
    case Granularity.Daily:
      return { start: date, end: addDays(date, 1) };
    default:
      return { start: date, end: date };
  }
};

const margin = {
  top: 20,
  bottom: 20,
  left: 50,
  right: 20,
};

const SpendingAnalysisChart = (props: Props) => {
  const employeeList = useSelector(selectEmployees);
  const engagementList = useSelector(selectEngagement);
  const chartRef = useRef(null);
  const { width, height } = props;
  const canvasWidth = width - margin.left - margin.right;
  const canvasHeight = height - margin.top - margin.bottom;

  const dates = createTimeSteps(props);
  const spending = dates
    .map(timeStepToInterval(props))
    .map(getTotalSpending(engagementList, employeeList));

  const pathData: [Date, number][] = dates.map((date, idx) => [
    date,
    spending[idx],
  ]);

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dates) as [Date, Date])
    .range([0, canvasWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([0, spending.reduce((a, b) => Math.max(a, b))])
    .range([canvasHeight, 0]);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickValues(dates));
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale));
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('width', '5')
      .attr(
        'd',
        d3
          .line<[Date, number]>()
          .x(d => xScale(d[0]))
          .y(d => yScale(d[1]))(pathData) || ''
      );
  }, [chartRef, xScale, yScale, height, dates, pathData]);
  return <svg ref={chartRef} width={width} height={height} />;
};

export default SpendingAnalysisChart;
