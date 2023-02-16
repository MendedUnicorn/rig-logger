import { DateTime } from 'luxon';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  HorizontalGridLines,
  LineSeries,
  VerticalBarSeries,
  XAxis,
  YAxis,
  XYPlot,
} from 'react-vis';
import { selectCreateDataset } from '../../selectors/tripSelectors';

const Graph = ({ start, end }) => {
  const getData = useSelector(selectCreateDataset('2022-01-01', '2023-12-31'));
  const data = getData?.map((d) => ({
    x: DateTime.fromISO(d.x).toMillis(),
    y: d.y,
  }));

  const formatXaxis = (v) => {
    console.log(DateTime.fromMillis(v).toFormat('LLL yy'));
    return DateTime.fromMillis(v).toFormat('LLL yy');
  };
  // FIX THE X AXIS SO THAT WE GET LABELS ALL THE WAY
  console.log('data', data);

  // const timestamp = new Date('Jan 01 2022').getTime();
  // const ONE_DAY = 86400000;
  // const DATA = [
  //   { x0: ONE_DAY * 2, x: ONE_DAY * 3, y: 1 },
  //   { x0: ONE_DAY * 7, x: ONE_DAY * 8, y: 1 },
  //   { x0: ONE_DAY * 8, x: ONE_DAY * 9, y: 1 },
  //   { x0: ONE_DAY * 9, x: ONE_DAY * 10, y: 2 },
  //   { x0: ONE_DAY * 10, x: ONE_DAY * 11, y: 2.2 },
  //   { x0: ONE_DAY * 19, x: ONE_DAY * 20, y: 1 },
  //   { x0: ONE_DAY * 20, x: ONE_DAY * 21, y: 2.5 },
  //   { x0: ONE_DAY * 21, x: ONE_DAY * 24, y: 1 },
  // ].map((el) => ({ x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y }));
  // const MONTHS = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];
  return (
    <XYPlot width={800} height={500} margin={{ bottom: 100 }}>
      {/* <VerticalGridLines tickValues={[1, 2]} /> */}
      <VerticalBarSeries data={data} color={'green'} />
      <XAxis
        // xType='time'
        //xDomain={MONTHS}
        // tickFormat={(v) => MONTHS[v - 1]}
        tickFormat={formatXaxis}
        tickLabelAngle={60}
        top={450}
        // tickValues={Array.from(Array(24).keys())}

        //title='X'
        //tickValues={[1, 2, 3, 4, 5, 6, 7]}
        //  tickFormat={(v) => 'test' + v}
      />
      <YAxis
      //title='Y'
      //tickValues={[1, 2, 3]}
      //tickFormat={(v) => v}
      />
    </XYPlot>
  );
};

export default Graph;

// x: time/moth  - y: days in field
