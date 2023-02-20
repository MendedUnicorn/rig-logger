import * as d3 from 'd3';
import React, { useState, useEffect } from 'react';
import worldData from '../data/countries.geojson';
const url = new URL('../data/norwayCities.json', import.meta.url);
const field = new URL('../data/field.json', import.meta.url);

const useLoadMapData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    setLoading(true);
    Promise.all([d3.json(worldData), d3.json(url), d3.json(field)]).then(
      ([geoJSONdata, citiesData, fieldData]) => {
        setData([geoJSONdata, citiesData, fieldData]);
        setLoading(false);
      }
    );
  }, []);

  return [data, loading];
};

export default useLoadMapData;
