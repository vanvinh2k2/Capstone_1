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
    { id: 'room3', title: 'Table 3' },
  ];
  const navigate = useNavigate();

  const handleEventClick = (info) => {
    navigate('/restaurant/order-detail');
  };

  const handleDatesSet = (arg) => {
    const selectedDate = arg.view.activeStart; // Lấy ngày khi người dùng click vào "Prev" hoặc "Next"
    const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}/${
      (selectedDate.getMonth() + 1).toString().padStart(2, '0')
    }/${selectedDate.getFullYear()}`;
    console.log('Selected Date (dd/MM/yyyy):', formattedDate);
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
            title: 'Time: 08:00-10:00<br>people:45<br>Deposited: 45$',
            start: '2023-10-19T08:00',
            end: '2023-10-19T10:00',
            resourceId: 'room1',
            eventBackgroundColor: 'red',
          },
          {
            title: 'Time: 11:20-15:00<br>people:45<br>Deposited: 45$',
            start: '2023-10-19T11:20',
            end: '2023-10-19T15:00',
            resourceId: 'room1',
            eventBackgroundColor: 'red',
          },
          {
            title: 'Time: 09:00-11:00<br>people:5<br>Deposited: 45$',
            start: '2023-10-19T09:00:00',
            end: '2023-10-19T11:00:00',
            resourceId: 'room2',
          },
          {
            title: 'Time: 16:00-18:00<br>people:5<br>Deposited: 45$',
            start: '2023-10-19T16:00:00',
            end: '2023-10-19T18:00:00',
            resourceId: 'room3',
          },
        ]}
        eventClick={handleEventClick}
        datesSet={handleDatesSet}
        eventContent={(arg) => (
          <>
            <div dangerouslySetInnerHTML={{ __html: arg.event.title }} />
          </>
        )}
      />
    </div>
  );
}

export default ManageOrder;