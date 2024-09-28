import React, { useState } from 'react';
import Calendar from 'react-calendar';


function MyCalendar() {
  const [value, onChange] = useState(new Date()); // todays date

 // this component will eventually have a way to get updated info
 // and accurate dates
 

  return (
    <Calendar 
      onChange={onChange} 
      value={value} 
      style={{
        color: 'white' // This changes the text color of the entire calendar
      }}
      tileClassName={({ date, view }) => {
        if (view === 'month') {
          return 'custom-tile'; // 
        }
      }}
    />
  );
}

export default MyCalendar;