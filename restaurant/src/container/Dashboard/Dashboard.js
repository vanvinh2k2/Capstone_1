import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid'; // Thêm dayGridPlugin
import {useNavigate} from 'react-router-dom';

function ManageOrder() {
  // Danh sách các bàn
  const resources = [
    { id: 'room1', title: 'Table 1' },
    { id: 'room2', title: 'Table 2' },
  ];
  const navigate = useNavigate();

  const handleEventClick = (info) => {
    navigate('/restaurant/order-detail');
  };

  return (
    <div>
      <nav className='nav-header'>
        <i class="fas fa-list"></i>
        <i class="fa-solid fa-user"></i>
      </nav>
      <nav className='nav-middle'>
      <div className="view-link">
          <p className='top'>Dashboard</p>
          <p><a href="/restaurant">Home</a></p>
          <i class="fas fa-chevron-right"></i>
          <p>Dashboard</p>
      </div>
      <div className="add-table">
      </div>
      </nav>
      <FullCalendar
        plugins={[resourceTimelinePlugin, dayGridPlugin]}
        initialView="resourceTimelineDay"
        resources={resources}
        events={[
          {
            title: 'Sự kiện 1',
            start: '2023-10-15T08:00:00',
            end: '2023-10-15T10:00:00',
            resourceId: 'room1',
            eventBackgroundColor: 'red',
          },
          {
            title: 'Sự kiện 2',
            start: '2023-10-15T09:00:00',
            end: '2023-10-15T11:00:00',
            resourceId: 'room2',
          },
        ]}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default ManageOrder;