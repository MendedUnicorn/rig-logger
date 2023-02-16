import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { DateTime } from 'luxon';

const DatePickerInput = ({
  handleSetStartDate,
  startDate,
  handleSetEndDate,
  endDate,
}) => {
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  const handleChange = (dates) => {
    const [start, end] = dates;
    handleSetStartDate(start);
    handleSetEndDate(end);
  };

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      // inline
      showIcon
      isClearable
      placeholderText='Select dates'
      dateFormat={'MMM d, yyyy'}
      className='calendar-picker'
    />
  );
};

export default DatePickerInput;
