import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
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

const useStyles = makeStyles({
  root: { color: "red" },
  element: { width: "100%", marginBottom: "20px" },
  menue: {
    display: "flex",
  },
});

const Root = () => {
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
  options.forEach((opt) => dispatch(startSetOptions(opt)));
  const styles = useStyles();

  // dispatch(startAddOption('rigs', { name: 'Balder' }));
  // dispatch(startAddOption('contractors', { name: 'Archer' }));

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
          onTabSelect={(e, d) => console.log(e, d)}
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
