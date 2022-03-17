import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./componentstyle.css";
import "./date.css";

const DateRange = (props) => {
  let fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 1);
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <label className="date-name">{props.title}</label>

      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          props.onchangeFunction(
            "startDate",
            date.toISOString().substring(0, 10)
          );
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => {
          setEndDate(date);
          props.onchangeFunction(
            "endDate",
            date.toISOString().substring(0, 10)
          );
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
};
export default DateRange;
