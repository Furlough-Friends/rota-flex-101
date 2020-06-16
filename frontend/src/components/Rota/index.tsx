import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'tippy.js/dist/tippy.css';

import { EventApi } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect } from 'react';
import tippy from 'tippy.js';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import rotaStyle from './rota.module.scss';
import {
  selectEngagement,
  fetchEngagements,
} from '../../store/engagementSlice';
import { useAuth0 } from '../../auth0Spa';
import { Engagement, Employee } from '../../model';
import { fetchEmployee, selectEmployees } from '../../store/employeeSlice';
import { showModal, ModalType } from '../../store/modalSlice';

const COLOUR_CYCLES = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow'];

const engagementToCalendarEvent = (employeeList: Employee[]) => (
  engagement: Engagement
) => {
  const { start, end, staffId, type } = engagement;
  const employee = employeeList.find(staff => staff.id === staffId);
  return {
    start,
    end,
    title: employee?.surname,
    description: `<p>${employee?.firstName} ${employee?.surname}<p>From: ${start}<p>To: ${end}<p>Type: ${type}`,
    color: COLOUR_CYCLES[staffId % COLOUR_CYCLES.length],
    extendedProps: { engagement },
  };
};

const tooltipFunction = (info: { event: EventApi; el: HTMLElement }) => {
  tippy(info.el, {
    content: info.event.extendedProps.description,
    allowHTML: true,
  });
};

const TIME_FORMAT = {
  hour12: false,
  hour: 'numeric',
  minute: '2-digit',
};

const BUTTON_TEXT = {
  today: 'Today',
  month: 'Month',
  week: 'Week',
  day: 'Day',
  list: 'List',
};

const addEngagementClicked = (dispatch: Dispatch) => () =>
  dispatch(
    showModal({
      type: ModalType.CreateEngagement,
    })
  );

const eventClicked = (dispatch: Dispatch) => ({
  event,
}: {
  event: EventApi;
}) => {
  dispatch(
    showModal({
      type: ModalType.EditEngagement,
      engagement: event.extendedProps.engagement,
    })
  );
};

const Rota = () => {
  const engagementList = useSelector(selectEngagement);
  const employeeList = useSelector(selectEmployees);
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const getEmployeesAndEngagements = async () => {
      const accessToken = await getTokenSilently();
      dispatch(fetchEmployee(accessToken));
      dispatch(fetchEngagements(new Date(0), new Date(1e14), accessToken));
    };
    getEmployeesAndEngagements();
  }, [dispatch, getTokenSilently]);

  return (
    <div className={rotaStyle.rota}>
      <h1 className={rotaStyle.header}> Rota </h1>
      <div className={rotaStyle.calendarContainer}>
        <FullCalendar
          plugins={[timeGridPlugin]}
          height="parent"
          locale={navigator.language}
          allDaySlot={false}
          slotLabelFormat={TIME_FORMAT}
          minTime="08:00:00"
          maxTime="21:00:00"
          events={engagementList.map(engagementToCalendarEvent(employeeList))}
          buttonText={BUTTON_TEXT}
          eventRender={tooltipFunction}
          eventClick={eventClicked(dispatch)}
          customButtons={{
            add: {
              text: 'Add',
              click: addEngagementClicked(dispatch),
            },
          }}
          header={{
            right: 'add prev,today,next',
          }}
        />
      </div>
    </div>
  );
};

export default Rota;
