import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { setAllTrips } from '../slices/tripsSlice';
import { app, db } from '../firebase/firebaseConfig';
import { startAddOption, startSetOptions } from '../slices/optionsSlice';

const Root = () => {
  const dispatch = useDispatch();
  dispatch(setAllTrips());
  const options = [
    'rigs',
    'operators',
    'contractors',
    'fsms',
    'des',
    'colleagues',
    'tools',
  ];
  options.forEach((opt) => dispatch(startSetOptions(opt)));

  // dispatch(startAddOption('rigs', { name: 'Balder' }));
  // dispatch(startAddOption('contractors', { name: 'Archer' }));

  return (
    <div className='root'>
      <div className='sidebar'>
        <h1 className='sidebar__title'>Rig Logger</h1>
        <br />
        <NavLink to='overview'>Overview</NavLink>
        <NavLink to='create'>Add new trip</NavLink>
        <NavLink to='trips'>Trips</NavLink>
        <NavLink to='options'>Options</NavLink>
      </div>
      <div className='detail'>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
