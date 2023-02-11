import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { setAllTrips } from '../slices/tripsSlice';

const Root = () => {
  const dispatch = useDispatch();
  dispatch(setAllTrips());

  return (
    <div className='root'>
      <div className='sidebar'>
        <h1 className='sidebar__title'>Rig Logger</h1>
        <br />
        <NavLink to='overview'>Overview</NavLink>
        <NavLink to='create'>Add new trip</NavLink>
        <NavLink to='trips'>Trips</NavLink>
      </div>
      <div className='detail'>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
