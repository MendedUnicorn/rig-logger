import React, { useEffect } from 'react';
// import { BarChart } from '@d3/bar-chart';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import {
  selectCreateDataset,
  selectTotalAmountOfTrips,
} from '../../selectors/tripSelectors';
import { DateTime } from 'luxon';
import { setLogLevel } from 'firebase/app';

const BarChart = ({ data }) => {
  const width = document.querySelector('body').clientWidth / 2;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 55, left: 70 };

  useEffect(() => {
    if (data) {
      const x_scale = d3
        .scaleBand()
        .range([margin.left, width - margin.right])
        .domain(data.map((d) => d.x))
        .padding(0.1);
      const y_scale = d3
        .scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([0, d3.max(data, (d) => d.y)]);

      const x_axis = d3.axisBottom(x_scale);
      const y_axis = d3.axisLeft(y_scale);

      const svg = d3
        .select('#bar-chart')
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        .attr('viewBox', [0, 0, width, height]);

      const bar = svg.selectAll('g').data(data).enter().append('g');

      bar
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x_scale(d.x))
        .attr('y', (d) => y_scale(d.y))
        .attr('width', x_scale.bandwidth())
        .attr('height', (d) =>
          Math.floor(height - margin.bottom - y_scale(d.y))
        )
        .attr('position', 'relative');

      // ToolTip hover
      const toolTip = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip-barchart')
        .style('opacity', 1)
        .style('position', 'absolute');

      bar
        .on('mouseover', function (e, d) {
          d3.select(this).transition().duration('50').attr('opacity', '0.85');
          toolTip.style('opacity', '1').html(
            `${d.y} days 
              ${DateTime.fromISO(d.x).toFormat('LLL-yyyy')}`
          );
          return toolTip.style('opacity', '1');
        })
        .on('mousemove', function (e, d) {
          return toolTip
            .style('top', e.pageY - 30 + 'px')
            .style('left', e.pageX + 10 + 'px');
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration('50').attr('opacity', '1');
          return toolTip.style('opacity', '0');
        });

      const xAxis = svg
        .append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(x_axis);

      xAxis
        .selectAll('text')
        .attr('transform', `translate(-10, 15) rotate(-65)`)
        .text((d, i) => {
          if (data.length > 36) {
            return i % 4 ? '' : DateTime.fromISO(d).toFormat('LLL yy');
          }
          if (data.length > 12) {
            return i % 2 ? DateTime.fromISO(d).toFormat('LLL yy') : '';
          } else {
            return DateTime.fromISO(d).toFormat('LLL yy');
          }
        });

      const yAxis = svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(y_axis);
      return () => {
        svg.remove();
        toolTip.remove();
      };
    }
  }, [data]);

  return (
    <div id='bar-chart'>
      {/* <p>BarChart</p>
      <p>Check it out</p> */}
    </div>
  );
};

export default BarChart;
