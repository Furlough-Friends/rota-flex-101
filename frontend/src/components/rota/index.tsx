import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'tippy.js/dist/tippy.css';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import tippy from 'tippy.js';

import rotaStyle from './rota.module.scss';

const DUMMY_EVENTS = [
  {
    start: '2020-05-08T08:39:14Z',
    end: '2020-05-08T19:41:14Z',
    title: 'slacking off plz pay',
    description: 'no, seriously, I need that money',
    color: 'seagreen',
  },
  {
    start: '2020-05-08T11:28Z',
    end: '2020-05-08T13:33Z',
    title: 'lunch',
    description: 'FOOOD',
    color: 'gold',
  },
];

const tooltipFunction = (info: any) => {
  tippy(info.el, {
    content: info.event.extendedProps.description,
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

const Rota = () => (
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
        events={DUMMY_EVENTS}
        buttonText={BUTTON_TEXT}
        eventRender={tooltipFunction}
      />
    </div>
  </div>
);

export default Rota;
