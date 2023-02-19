import React, { useEffect } from 'react';
import * as d3 from 'd3';
import worldData from '../../data/countries.geojson';
import norwayCities from '../../data/norwayCities.json';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';

const MapChart = () => {
  const margin = { top: '10', right: '30', bottom: '50', left: '70' };
  const width = document.querySelector('body').clientWidth / 2;
  const height = 500;
  const dbData = useSelector((state) => state.trips);

  //   const worldData = require('../../data/countries.geojson');
  //   const norwayCities = require('../../data/norwayCities.json');

  useEffect(() => {
    const projection = d3
      .geoMercator()
      //   .rotate([-11, 0])
      .scale(6000)
      .translate([-1500, -400]);

    const pathGenerator = d3.geoPath().projection(projection);
    console.log(dbData);
    const svg = d3
      .select('.world-map')
      .append('svg')
      .attr('viewbox', [0, 0, width, height])
      //   .attr('preserveAspectRatio', 'xMidyMid')
      .style('max-width', 1200)
      .style('margin', 'auto')
      .style('display', 'flex')
      .attr('height', height)
      .attr('width', width);

    const g = svg.append('g');

    const tooltip = d3
      .select('.world-map')
      .append('div')
      .attr('class', 'tooltip-map')
      .style('opacity', 0)
      .style('position', 'absolute');

    const url = new URL('../../data/norwayCities.json', import.meta.url);

    Promise.all([
      d3.json(worldData),
      d3.json(url),
      d3.json(
        'https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria-states.json'
      ),
    ]).then(([geoJSONdata, citiesData, third]) => {
      third.forEach((d) => {
        d.info.Latitude = +d.info.Latitude;
        d.info.Longitude = +d.info.Longitude;
      });
      citiesData.forEach((d) => {
        d.lat = +d.lat;
        d.lng = +d.lng;
      });

      const rigData = dbData
        .filter((d) => {
          return d.location;
        })
        .map((d) => ({
          rig: d.rig,
          lat: +d.location.lat,
          long: +d.location.long,
          date: DateTime.fromISO(d.dateFrom).toFormat('LLL yyyy'),
        }));
      console.log('rigdata', rigData);

      projection.fitSize([width, height], geoJSONdata);

      g.selectAll('path')
        .data(geoJSONdata.features)
        .join('path')
        .attr('d', pathGenerator);

      g.selectAll('text')
        .data(citiesData)
        .join('text')
        .attr('x', (d) => projection([d.lng, d.lat])[0])
        .attr('y', (d) => projection([d.lng, d.lat])[1])
        .attr('dy', -7)
        .style('font-size', '0px')
        .attr('text-anchor', 'middle')
        .text((d) => d.city)
        .style('fill', 'black');

      g.selectAll('circle')
        .data(rigData)
        .join('circle')
        .attr('cx', (d) => projection([d.long, d.lat])[0])
        .attr('cy', (d) => projection([d.long, d.lat])[1])
        .attr('r', 5)
        .style('fill', 'black')
        .on('mouseover', function (e, d) {
          console.log(e);
          tooltip
            .transition()
            .duration(100)
            .style('display', 'inline')
            .style('opacity', 1);
          tooltip
            .html(`<p>${d.rig}</p> <p>${d.date} </p>`)
            .style('left', e.pageX + 20 + 'px')
            .style('top', e.pageY - 50 + 'px');
        })
        .on('mouseout', function (e, d) {
          tooltip.transition().duration(200).style('display', 'none');
        });

      console.log(dbData);
    });

    const zooming = d3
      .zoom()
      .scaleExtent([0, 1000]) // the limit of the zoom to prevent it zooming forever
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', (e) => {
        // console.log(e);
        g.selectAll('path').attr('transform', e.transform);
        //   .style('stroke-width', 0.5 / e.transform.k + 'px');

        g.selectAll('text')
          .attr('transform', e.transform)
          .style('font-size', '0px')
          .attr('dy', -7 / e.transform.k)
          .attr('class', 'city-names');

        g.selectAll('circle')
          .attr('transform', e.transform)
          .attr('r', 7 / e.transform.k);

        let scale = d3
          .select('.city-names')
          .attr('transform')
          .match(/(?:scale)\((\d*.\d*)/)[1];

        if (scale < 150) {
          g.selectAll('text').style('font-size', '0px');
        } else {
          g.selectAll('text').style('font-size', `${18 / e.transform.k}px`);
        }
      });

    svg.call(zooming);

    return () => {
      svg.remove();
    };
  }, []);

  return <div className='world-map'></div>;
};

export default MapChart;
