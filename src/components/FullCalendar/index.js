import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';

const headerToolbar = {
  left: 'prev,next today',
  center: 'title',
  right: 'dayGridMonth,timeGridWeek,timeGridDay',
};

const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];

const Calendar = ({ initialView = 'dayGridMonth', ...rest }) => {
  return (
    <FullCalendar
      locales={allLocales}
      locale="pt-br"
      editable={true}
      selectable={true}
      headerToolbar={headerToolbar}
      plugins={plugins}
      initialView={initialView}
      {...rest}
    />
  );
};

export default Calendar;
