import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className='root'>
      <div className='sidebar'>
        <h1 className='sidebar__title'>Rig Logger</h1>
        <br />
        <NavLink to='overview'>Overview</NavLink>
        <NavLink to='new-trip'>Add new trip</NavLink>
        <NavLink to='statistics'>Statistics</NavLink>
      </div>
      <div className='detail'>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
