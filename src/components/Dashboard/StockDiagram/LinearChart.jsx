// src/LinearChart.js
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "../Dashboard.css";
const LinearChart = ({ data }) => {
  const d3Container = useRef(null);
  const tooltip = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const parseTime = d3.timeParse("%H:%M");

      const formattedData = data.map((d) => ({
        time: parseTime(d.time),
        close: d.close,
      }));

      const margin = { top: 10, right: 20, bottom: 30, left: 40 },
        width = 660 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      const valueline = d3
        .line()
        .x((d) => x(d.time))
        .y((d) => y(d.close));

      const svg = d3
        .select(d3Container.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      x.domain(d3.extent(formattedData, (d) => d.time));
      y.domain([
        d3.min(formattedData, (d) => d.close),
        d3.max(formattedData, (d) => d.close),
      ]);

      svg
        .append("path")
        .data([formattedData])
        .attr("class", "line")
        .attr("d", valueline)
        .style("stroke", "steelblue")
        .style("fill", "none")
        .style("stroke-width", "2px");

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append("g").call(d3.axisLeft(y));

      svg
        .append("g")
        .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
        .style("color", "lightgray")
        .selectAll(".tick line")
        .style("stroke", "lightgray")
        .style("stroke-opacity", "0.7")
        .style("shape-rendering", "crispEdges")

        .classed("grid", true);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickSize(-height).tickFormat(""))
        .style("color", "lightgray")
        .selectAll(".tick line")
        .style("stroke", "lightgray")
        .style("stroke-opacity", "0.7")
        .style("shape-rendering", "crispEdges")
        .classed("grid", true);

      const tooltipDiv = d3
        .select(tooltip.current) // Use the existing D3 container
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

      svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        // Define circle attributes here
        .on("mouseover", function (event, d) {
          tooltipDiv.style("opacity", 1);
          tooltipDiv
            .html("Tooltip content here" + d.close)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 15 + "px");
        })
        .on("mouseout", function () {
          tooltipDiv.style("opacity", 0);
        });
    }
  }, [data]); // Redraw chart if data changes

  return (
    <>
      {" "}
      <svg ref={d3Container} /> 
      <div ref={tooltip} />{" "}
    </>
  );
};

export default LinearChart;
