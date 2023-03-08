import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  selectCreateDataset,
  selectTopBottomColleague,
  selectTopBottomXofY,
  selectTotalAmountOfTrips,
} from "../selectors/tripSelectors";

import Ranked from "./statistics/Ranked";
import { format } from "date-fns";
import { DateTime } from "luxon";
import ImportFromDawinci from "./ImportFromDawinci";
import BarChart from "./statistics/BarChart";
import ReactDatePicker from "react-datepicker";
import MapChart from "./statistics/MapChart";
import { DatePicker, DayOfWeek } from "@fluentui/react-date-time";
import { Label } from "@fluentui/react-components";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  useZoomPanContext,
} from "react-simple-maps";
import worldData from "../data/countries.geojson";
import { Tooltip } from "react-tooltip";
import worldDataSmall from "../data/custom.geojson";
import GetRigs from "../data/GetRigs";

const CustomMarker = ({ key, coordinates, rig, setTooltip }) => {
  const ctx = useZoomPanContext();
  return (
    <Marker
      key={key}
      coordinates={coordinates}
      onMouseEnter={(e) => setTooltip(rig)}
      onMouseLeave={(e) => setTooltip("")}
    >
      <a className="test">
        <circle
          r={0.8 * (ctx.k * 0.17) + 0.83}
          fill="#F00"
          stroke="#490"
          strokeWidth={0.1}
        />
      </a>
      <text></text>
    </Marker>
  );
};

const OverviewPage = () => {
  // const data = useSelector((state) => state.trips);
  const [startDate, setStartDate] = useState(
    DateTime.now().startOf("year").toJSDate()
  );
  const [endDate, setEndDate] = useState(DateTime.now().toJSDate());

  const data = useSelector(
    selectCreateDataset(startDate.toISOString(), endDate.toISOString())
  );
  const [tooltip, setTooltip] = useState("");
  const [loading, setLoading] = useState(true);
  const mapDataTrips = useSelector((state) => state.trips);
  const url = new URL("../data/norwayCities.json", import.meta.url);

  // finds data with more than x days offshore -use selectors like this for filters
  // const dataFiltered = useSelector(
  //   selectBetweenDates('2022-01-01', '2023-12-31')
  // ); //useSelector(selectTripsWithDays(1, '>'));

  const numberOfTrips = useSelector(selectTotalAmountOfTrips);

  const top = useSelector(selectTopBottomColleague(3));
  const topRig = useSelector(selectTopBottomXofY("de", 3));

  const handleStartDateChange = (e) => {
    setStartDate(e ? format(e, "yyyy-MM-dd") : "");
  };
  const handleEndDateChange = (e) => {
    setEndDate(e ? format(e, "yyyy-MM-dd") : "");
  };

  const markers = mapDataTrips
    .filter((trip) => trip.location)
    .map((trip, i) => {
      return {
        rig: trip.rig,
        coordinates: [trip.location?.long, trip.location?.lat],
        key: i,
      };
    });
  const ctx = useZoomPanContext();

  useEffect(() => setLoading(false), []);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="overview">
        <h2>Overview</h2>
        <p>Stats</p>

        <div className="input-group">
          <Label>From</Label>
          <DatePicker
            value={startDate}
            onSelectDate={(date) => setStartDate(date)}
            firstDayOfWeek={DayOfWeek.Monday}
          />
          <Label>To</Label>
          <DatePicker
            value={endDate}
            onSelectDate={(date) => setEndDate(date)}
            firstDayOfWeek={DayOfWeek.Monday}
          />
        </div>

        <Tooltip anchorSelect=".test">{tooltip}</Tooltip>

        {data && (
          <div>
            <p>Total trips {numberOfTrips}</p>
          </div>
        )}

        <ComposableMap
          projection={"geoMercator"}
          // width={document.querySelector("body").clientWidth}
          // height={500}
          projectionConfig={{
            rotate: [-10.0, -53.0, 0],
            scale: 2000,
          }}
        >
          <ZoomableGroup center={[2, 65]} zoom={1}>
            <Geographies geography={worldDataSmall}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="blue"
                    stroke="white"
                  />
                ))
              }
            </Geographies>
            {markers.map(({ rig, coordinates, key }) => (
              <>
                <CustomMarker
                  setTooltip={setTooltip}
                  onMouseEnter={(e) => console.log("EEEE")}
                  rig={rig}
                  coordinates={coordinates}
                  key={key}
                ></CustomMarker>
                <Tooltip anchorSelect=".test">AAA{tooltip}</Tooltip>
              </>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {data && <BarChart data={data} />}
        {/* <MapChart /> */}
        <div className="overview-container">
          <Ranked number={5} category={"rig"} />
          <Ranked number={5} category={"colleagues"} />
          <Ranked number={3} category={"fsm"} />
          <Ranked number={3} category={"de"} />
          <Ranked number={3} category={"operator"} />
          <Ranked number={3} category={"contractor"} />
        </div>
      </div>
    );
  }
};

export default OverviewPage;
