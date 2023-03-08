import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function useStats() {
  const [data, setData] = useState(useSelector((state) => state.trips));

  const calculateAverageTripLength = () => {
    data.map(trip => )
  }

  return <div>useStats</div>;
}

export default useStats;
