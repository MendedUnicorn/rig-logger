import React, { useCallback, useEffect } from 'react';
import * as d3 from 'd3';
import worldData from '../../data/countries.geojson';
import norwayCities from '../../data/norwayCities.json';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { useD3 } from '../../hooks/useD3';
import useLoadMapData from '../../hooks/useLoadMapData';

const MapChart = () => {
  const margin = { top: '10', right: '30', bottom: '50', left: '70' };
  const width = document.querySelector('body').clientWidth / 2;
  const height = 500;
  const dbData = useSelector((state) => state.trips);
  const url = new URL('../../data/norwayCities.json', import.meta.url);

  const [data, loading] = useLoadMapData();

  const ref = useCallback(
    useD3(
      (svg) => {
        const g = svg.select('.map-group');

        const projection = d3.geoMercator();
        // .rotate([-11, 0])
        // .scale(6000)
        // .translate([-1500, -400]);

        const pathGenerator = d3.geoPath().projection(projection);

        const tooltip = d3
          .select('.tooltip-map')
          .style('opacity', 0)
          .style('position', 'absolute');

        if (data) {
          data[1].forEach((d) => {
            d.lat = +d.lat;
            d.lng = +d.lng;
          });

          const rigData = dbData
            .filter((d) => {
              return d.location?.lat && d?.location?.long;
            })
            .map((d) => ({
              rig: d.rig,
              lat: d.location.lat,
              long: d.location.long,
              date: DateTime.fromISO(d.dateFrom).toFormat('LLL yyyy'),
            }));

          projection.fitSize([width, height], data[0]);

          svg
            .select('.map-area')
            .attr('fill', 'steelblue')
            .selectAll('path')
            .data(data[0].features)
            .join('path')
            .attr('d', pathGenerator);

          //   svg
          //     .select('.map-area')
          //     .attr('fill', 'blue')
          //     .selectAll('path')

          //     .attr('class', 'tets')
          //     .data(data[2].features)
          //     .join('path')
          //     .attr('d', pathGenerator);

          svg
            .select('.map-area')
            .selectAll('text')
            .data(data[1])
            .join('text')
            .attr('x', (d) => projection([d.lng, d.lat])[0])
            .attr('y', (d) => projection([d.lng, d.lat])[1])
            .attr('dy', -7)
            .style('font-size', '1px')
            .attr('text-anchor', 'middle')
            .text((d) => d.city)
            .style('fill', 'black');

          svg
            .select('g')
            .selectAll('circle')
            .data(rigData)
            .join('circle')
            .attr('cx', (d) => projection([d.long, d.lat])[0])
            .attr('cy', (d) => projection([d.long, d.lat])[1])
            .attr('r', 1)
            .style('fill', 'black')
            .on('mouseover', function (e, d) {
              console.log(e);
              tooltip
                .transition()
                .duration(100)
                //   .style('display', 'inline')
                .style('opacity', 1);
              tooltip
                .html(`<p>${d.rig}</p> <p>${d.date} </p>`)
                .style('left', e.layerX + 20 + 'px')
                .style('top', e.layerY - 50 + 'px');
            })
            .on('mouseout', function (e, d) {
              tooltip.transition().duration(200).style('opacity', 0);
            });
        } else {
          console.log(loading);
        }
        const zooming = d3
          .zoom()
          .scaleExtent([0, 1000]) // the limit of the zoom to prevent it zooming forever
          .extent([
            [0, 0],
            [width, height],
          ])
          .on('zoom', (e) => {
            svg.select('g').selectAll('path').attr('transform', e.transform);
            svg
              .select('g')
              .selectAll('text')
              .attr('transform', e.transform)
              .style('font-size', '0.11px')
              .attr('dy', -7 / e.transform.k)
              .attr('class', 'city-names');
            svg
              .select('g')
              .selectAll('circle')
              .attr('transform', e.transform)
              .attr('r', 5 / e.transform.k);
            // make names show up at certain zoom level
            //   let scale = d3
            //     .select('.city-names')
            //     .attr('transform')
            //     .match(/(?:scale)\((\d*.\d*)/)[1];
            //   if (scale < 150) {
            //     g.selectAll('text').style('font-size', '0px');
            //   } else {
            //     g.selectAll('text').style('font-size', `${18 / e.transform.k}px`);
            //   }
          });

        svg.call(zooming);
        svg.call(
          zooming.transform,
          d3.zoomIdentity.translate(-2000, -541).scale(6.96)
        );

        // svg.select('g').call(world);

        //   svg.select('g').call(rigMarkers);
      },
      [url]
    ),
    [url]
  );

  //   useEffect(() => {

  //     return () => {
  //       svg.remove();
  //     };
  //   }, []

  //   const test = () => {
  //     console.log('clicked');
  //     svg.call(
  //       zooming.transform,
  //       d3.zoomIdentity.translate(-1799, -529).scale(6.96)
  //     );
  //   };

  return (
    <div className='world-map'>
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        height={height}
        width={width}
        style={{ maxWidth: '1200px', margin: 'auto', display: 'flex' }}
      >
        <g className='map-area' height={height} width={width}></g>
      </svg>
      <div className='tooltip-map'></div>
    </div>
  );
};

export default MapChart;
