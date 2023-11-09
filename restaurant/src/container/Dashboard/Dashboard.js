import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid'; // Thêm dayGridPlugin
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { manageOrder, getTables } from '../../action/restaurant';

function ManageOrder() {
  const dispatch = useDispatch();
  const display_order = useSelector(state=>state.restaurant.display_order);
  const tables = useSelector(state=>state.restaurant.tables);

  const currentDate = new Date();
  const year1 = currentDate.getFullYear();
  const month1 = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day1 = String(currentDate.getDate()).padStart(2, '0');
  const [day, setDay] = useState(day1);
  const [month, setMonth] = useState(month1);
  const [year, setYear] = useState(year1);
  const navigate = useNavigate();

  const [resources, setResources] = useState([])
  const [ev, setEv] = useState([])

  useEffect(()=>{
    async function manageorder(){
      const action = await manageOrder(localStorage.getItem('rid'), day, month, year);
      dispatch(action);
    }
    manageorder();
  }, [day, month, year])

  useEffect(()=>{
    async function gettables(){
        const action  = await getTables(localStorage.getItem('rid'))
        dispatch(action);
    }
    gettables();
  }, []);

  useEffect(()=>{
    let newResources = [];
    tables.map((item, index)=>{
      const table = {
        id: item.tid,
        title: item.title
      }
      newResources.push(table);
    });
    setResources(newResources);
  }, [tables]);

  useEffect(()=>{
    let newEV = [];
    display_order.map((item, index)=>{
      const order = {
        title: `Time: ${item.time_from.substring(0,5)} - ${item.time_to.substring(0,5)}
        <br>People: ${item.number_people}<br>
        Deposited: ${item.deposit}$`,
        start: `${item.order_date.substring(0,10)}T${item.time_from.substring(0,5)}`,
        end: `${item.order_date.substring(0,10)}T${item.time_to.substring(0,5)}`,
        resourceId: item.table.tid,
        oid: item.oid,
      }
      newEV.push(order);
    })
    setEv(newEV);
  }, [display_order]);

  const handleEventClick = (info) => {
    const event = info.event;
    const oid = event.extendedProps.oid;
    navigate(`/restaurant/order-detail/${oid}`);
  };

  const handleDatesSet = (e) => {
    const selectedDate = e.view.activeStart;
    setDay(selectedDate.getDate().toString().padStart(2, '0'));
    setMonth((selectedDate.getMonth() + 1).toString().padStart(2, '0'));
    setYear(selectedDate.getFullYear());
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
        resources={resources?resources:[]}
        events={ev?ev:[]}
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