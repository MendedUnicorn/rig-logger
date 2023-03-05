import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTripsSortedBy } from "../selectors/tripSelectors";
import { getAllTrips } from "../slices/tripsSlice";
import TripCard from "./TripCard";
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortBy,
} from "../slices/filtersSlice";
import ReactDatePicker from "react-datepicker";
import { DateTime } from "luxon";
import { format } from "date-fns";
import { Dropdown, Input, Label, Option } from "@fluentui/react-components";
import { Search24Regular } from "@fluentui/react-icons";
import { DatePicker, DayOfWeek } from "@fluentui/react-date-time";
import TripsTable from "./TripsTable";

const TripsPage = () => {
  const dispatch = useDispatch();
  const sortByValue = useSelector((state) => state.filters.sortBy);
  const filterText = useSelector((state) => state.filters.text);
  const startDate = useSelector((state) => state.filters.startDate);
  const endDate = useSelector((state) => state.filters.endDate);

  const totalTrips = useSelector((state) => state.trips.length);

  const filteredData = useSelector(
    selectTripsSortedBy(sortByValue, filterText, startDate, endDate)
  );

  const handleSortChange = (e, d) => {
    dispatch(sortBy(d.optionValue));
  };
  // fix text search filter
  const handleTextSearchChange = (e, d) => {
    dispatch(setTextFilter(d.value));
  };
  const handleStartDateChange = (e) => {
    dispatch(setStartDate(e ? format(e, "yyyy-MM-dd") : ""));
  };
  const handleEndDateChange = (e) => {
    dispatch(setEndDate(e ? format(e, "yyyy-MM-dd") : ""));
  };

  return (
    <div className="trip-page">
      <h2>All trips</h2>
      <p>
        Showing {filteredData.length} out of {totalTrips} trips
      </p>
      <div className="input-group">
        <div className="input">
          <Label>Sort By</Label>
          <Dropdown onOptionSelect={handleSortChange} value={sortByValue}>
            <Option text="Duration" value="length">
              Duration
            </Option>
            <Option text="Date" value="date">
              Date
            </Option>
            <Option text="Rig" value="rig">
              Rig
            </Option>
          </Dropdown>
        </div>
        <div className="input">
          <Label>Search</Label>
          <Input
            type="search"
            placeholder="Enter search text.."
            contentBefore={<Search24Regular />}
            onChange={handleTextSearchChange}
            value={filterText}
          ></Input>
        </div>
      </div>
      <div className="input-group">
        <Label>From Date</Label>
        <DatePicker
          value={""}
          onSelectDate={handleStartDateChange}
          firstDayOfWeek={DayOfWeek.Monday}
        />
        <Label>To Date</Label>
        <DatePicker
          value={""}
          onSelectDate={handleEndDateChange}
          firstDayOfWeek={DayOfWeek.Monday}
        />
      </div>

      {/* {filteredData &&
        filteredData.map((trip, i) => {
          return (
            <div className="">
              <TripCard trip={trip} key={trip.id} />
            </div>
          );
        })} */}
      <TripsTable trips={filteredData} />
    </div>
  );
};

export default TripsPage;
