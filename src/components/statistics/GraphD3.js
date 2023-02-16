import React, { useEffect } from 'react';
// import { BarChart } from '@d3/bar-chart';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import { selectCreateDataset } from '../../selectors/tripSelectors';
import { DateTime } from 'luxon';
import { generatePath } from 'react-router-dom';
import { svg } from 'd3';

const GraphD3 = () => {
  useEffect(() => {
    // const testData = [
    //   { x: 1, y: 3 },
    //   { x: 2, y: 8 },
    //   { x: 3, y: 5 },
    //   { x: 4, y: 1 },
    //   { x: 5, y: 2 },
    //   { x: 6, y: 7 },
    // ];

    const width = 500;
    const barHeight = 20;
    const height = barHeight * testData.length;
    const scaleFactor = 10;
    const xAxisPadding = 70;

    const graph = d3
      .select('#graph')
      .append('svg')
      .attr('width', width)
      .attr('height', barHeight * testData.length);

    const scale = d3
      .scaleLinear()
      .domain([
        testData.reduce((a, b) => (a.y < b.y ? a : b), 0).y,
        testData.reduce((a, b) => (a.y > b.y ? a : b), 0).y,
      ])
      .range([0, width - 100]);
    const testDataMS = testData.map((d) => DateTime.fromISO(d.x).toMillis());
    const scaleY = d3
      .scaleTime()
      .domain([new Date(d3.min(testDataMS)), new Date(d3.max(testDataMS))])
      .range([0, height]);

    const bar = graph
      .selectAll('g')
      .data(testData)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        return 'translate(' + 0 + ',' + i * barHeight + ')';
      });

    bar
      .append('rect')
      .attr('width', (d) => {
        return scale(d.y);
      })
      .attr('height', barHeight)
      .attr('fill', 'orange');

    bar
      .append('text')
      .attr('x', (d) => d.y * scaleFactor - 25)
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text((d) => d.y)
      .attr('fill', 'white');

    bar
      .append('text')
      .attr('x', (d) => xAxisPadding)
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text((d, i) => {
        if (i % 2) {
          return DateTime.fromISO(d.x).toFormat('LLL, yy');
          return d.x;
        }
      })
      .attr('fill', 'black');

    const xAxis = d3.axisBottom().scale(scale);
    const yAxis = d3.axisLeft().scale(scaleY).ticks(d3.timeMonth.every(1));

    graph.append('g').call(xAxis);
    graph.append('g').call(yAxis).attr('transform', 'translate(50,0)');

    return () => graph.remove();
  }, []);

  const testData = useSelector(selectCreateDataset('2022-01-01', '2023-12-31'));

  return (
    <div>
      <p>Hello</p>
      <p>What up</p>
      <div style={{ padding: '40px' }} id='graph'></div>
    </div>
  );
};

export default GraphD3;
