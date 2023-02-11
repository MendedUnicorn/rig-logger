import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const OverviewPage = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const dataFromStorage = JSON.parse(localStorage.getItem('trips'));
  //   setData(dataFromStorage);
  //   console.log(data);
  // }, []);
  const data = useSelector((state) => state.trips);
  console.log('data', data);
  return (
    <div className=''>
      <h2>Overview</h2>
      <p>Stats</p>

      {data && (
        <div>
          <p>Total trips {data.length}</p>
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
