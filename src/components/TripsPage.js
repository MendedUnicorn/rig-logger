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
import {
  Button,
  Dropdown,
  Input,
  Label,
  Option,
} from "@fluentui/react-components";
import { Search24Regular, Edit24Regular } from "@fluentui/react-icons";
import { DatePicker, DayOfWeek } from "@fluentui/react-date-time";
import TripsTable from "./TripsTable";
import ColleaguesTableView from "./form/ColleaguesTableView";
import RunTableView from "./form/RunTableView";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

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
    <>
      {modalOpen && (
        <div
          className="trip-modal__container"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(false);
          }}
        >
          <div
            className="trip-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="spacing-container row">
              <div className="spacing-container">
                <h2>Rig: {modalData && modalData.rig}</h2>
                <h3>Operator: {modalData.operator}</h3>
                <h3>Contactor: {modalData.contractor}</h3>
                <h4>FSM: {modalData.fsm}</h4>
                <h4>DE:{modalData.de}</h4>
                <h4>Latitude {modalData.lat}</h4>
                <h4>Longitude{modalData.long}</h4>
              </div>
            </div>
            <div className="spacing-container">
              <h3>Date From: {modalData.dateFrom}</h3>
              <h3>Date To: {modalData.dateTo}</h3>
            </div>
            <div className="spacing-container">
              <ColleaguesTableView colleagues={modalData.colleagues} viewOnly />
            </div>
            <div className="spacing-container">
              <RunTableView runs={modalData.runs} viewOnly />
            </div>
            <Button icon={<Edit24Regular />}>Edit</Button>
          </div>
        </div>
      )}
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
        <TripsTable
          trips={filteredData}
          setModalData={setModalData}
          setModalOpen={setModalOpen}
        />
      </div>
    </>
  );
};

export default TripsPage;
