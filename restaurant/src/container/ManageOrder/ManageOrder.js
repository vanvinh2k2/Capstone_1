import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid'; // Thêm dayGridPlugin

function ManageOrder() {
  // Danh sách các phòng
  const resources = [
    { id: 'room1', title: 'Phòng 1' },
    { id: 'room2', title: 'Phòng 2' },
  ];

  const handleEventClick = (info) => {
    alert(`Bạn đã nhấp vào sự kiện: ${info.event.title}`);
  };

  return (
    <div>
      <FullCalendar
        plugins={[resourceTimelinePlugin, dayGridPlugin]} // Sử dụng cả resourceTimelinePlugin và dayGridPlugin
        initialView="resourceTimelineDay"
        resources={resources}
        events={[
          {
            title: 'Sự kiện 1',
            start: '2023-10-10T08:00:00',
            end: '2023-10-10T10:00:00',
            resourceId: 'room1',
            eventBackgroundColor: 'red',
          },
          {
            title: 'Sự kiện 2',
            start: '2023-10-10T09:00:00',
            end: '2023-10-10T11:00:00',
            resourceId: 'room2',
          },
        ]}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default ManageOrder;