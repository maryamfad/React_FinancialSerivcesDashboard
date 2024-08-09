import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function LineChart({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        // Set up the SVG canvas dimensions
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 700 - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Set up the scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.date)))
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);

        // Add the X Axis
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        // Add the Y Axis
        svg.append('g')
            .call(d3.axisLeft(yScale));

        // Add the line
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#FE9920')
            .attr('stroke-width', 3)
            .attr('d', d3.line()
                .x(d => xScale(new Date(d.date)))
                .y(d => yScale(d.value))
            );

        // Add points
        svg.selectAll('.dot')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', d => xScale(new Date(d.date)))
            .attr('cy', d => yScale(d.value))
            .attr('r', 4)
            .attr('fill', '#FE9920');

    }, [data]);

    return <svg ref={svgRef}></svg>;
}

export default LineChart;