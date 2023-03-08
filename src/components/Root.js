import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { setAllTrips } from "../slices/tripsSlice";
import { app, db } from "../firebase/firebaseConfig";
import { startAddOption, startSetOptions } from "../slices/optionsSlice";
import { makeStyles, Tab, TabList } from "@fluentui/react-components";
import {
  Add24Regular,
  AirplaneTakeOff24Regular,
  Options24Regular,
  DataHistogram24Regular,
} from "@fluentui/react-icons";
import GetRigs from "../data/GetRigs";

const useStyles = makeStyles({
  root: { color: "red" },
  element: { width: "100%", marginBottom: "20px" },
  menue: {
    display: "flex",
  },
});

const Root = (props) => {
  const dispatch = useDispatch();
  dispatch(setAllTrips());
  const options = [
    "rigs",
    "operators",
    "contractors",
    "fsms",
    "des",
    "colleagues",
    "tools",
    "positions",
  ];
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(location.pathname.substring(1));
  options.forEach((opt) => dispatch(startSetOptions(opt)));
  console.log("fetched data");
  const styles = useStyles();

  useEffect(() => {
    setCurrentTab(location.pathname.substring(1));
  }, [location.pathname]);

  // dispatch(startAddOption('rigs', { name: 'Balder' }));
  // dispatch(startAddOption('contractors', { name: 'Archer' }));
  console.log(location.pathname.substring(1));
  return (
    <div className="root">
      <div className="sidebar">
        <h1 className="sidebar__title nav-text">Rig Logger</h1>
        <br />
        <TabList
          className={styles.menue}
          vertical
          size="large"
          defaultSelectedValue={"tab1"}
          onTabSelect={(e, d) => setCurrentTab(location.pathname.substring(1))}
          selectedValue={currentTab}
        >
          <NavLink to="overview">
            <Tab
              icon={<DataHistogram24Regular />}
              className={styles.element}
              value="overview"
            >
              <span className="nav-text">Overview</span>
            </Tab>
          </NavLink>
          <NavLink to="create">
            <Tab
              icon={<Add24Regular />}
              className={styles.element}
              value="create"
            >
              <span className="nav-text">Add New Trip</span>
            </Tab>
          </NavLink>
          <NavLink to="trips">
            <Tab
              icon={<AirplaneTakeOff24Regular />}
              className={styles.element}
              value="trips"
            >
              <span className="nav-text">Trips</span>
            </Tab>
          </NavLink>
          <NavLink to="options">
            <Tab
              icon={<Options24Regular />}
              className={styles.element}
              value="options"
            >
              <span className="nav-text">Options</span>
            </Tab>
          </NavLink>
        </TabList>
      </div>
      <div className="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
