// src/LinearChart.js
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "../Dashboard.css";
const LinearChart = ({ data }) => {
  const d3Container = useRef(null);
  const tooltip = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Initialize resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Assuming you want to use the contentRect width, which does not include borders or padding
        setContainerWidth(entry.contentRect.width);
      }
    });

    // Observe the d3Container
    if (d3Container.current) {
      resizeObserver.observe(d3Container.current);
    }

    // Cleanup on component unmount
    return () => {
      if (d3Container.current) {
        resizeObserver.unobserve(d3Container.current);
      }
    };
  }, [d3Container.current]);

  function drawChart(width) {
    if (data && d3Container.current && data.length > 0 && width > 0) {
      d3.select(d3Container.current).selectAll("*").remove();

      const parseTime = d3.timeParse("%H:%M");

      const formattedData = data.map((d) => ({
        time: parseTime(d.time),
        close: d.close,
        open: d.open,
        high: d.high,
        low: d.low,
        volume: d.volume,
      }));

      const margin = { top: 10, right: 20, bottom: 30, left: 40 },
        //   width = 660 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

      //Defining svg
      const svg = d3
        .select(d3Container.current)
        .attr("class", "svg-container")
        .style("position", "relative")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom)
        .on("mouseout", () => tooltipDiv.style("display", "none"))
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      //Scales
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(formattedData, (d) => d.time))
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(formattedData, (d) => d.close),
          d3.max(formattedData, (d) => d.close),
        ])
        .range([height, 0]);

      //Axes
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      svg.append("g").call(d3.axisLeft(yScale));

      //Grids
      svg
        .append("g")
        .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
        .style("color", "lightgray")
        .selectAll(".tick line")
        .style("stroke", "lightgray")
        .style("stroke-opacity", "0.7")
        .style("shape-rendering", "crispEdges")
        .classed("grid", true);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""))
        .style("color", "lightgray")
        .selectAll(".tick line")
        .style("stroke", "lightgray")
        .style("stroke-opacity", "0.7")
        .style("shape-rendering", "crispEdges")
        .classed("grid", true);

      //Chart Line
      const valueline = d3
        .line()
        .x((d) => xScale(d.time))
        .y((d) => yScale(d.close));

      svg
        .append("path")
        .data([formattedData])
        .attr("class", "line")
        .attr("d", valueline)
        .style("stroke", "steelblue")
        .style("fill", "none")
        .style("stroke-width", "2px");

      // Tooltip setup
      const tooltipDiv = d3
        .select(tooltip.current)
        .style("opacity", 0)
        .style("position", "absolute")
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

      // Mouse move line
      const mouseLine = svg
        .append("line")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .style("opacity", 0);

      // Invisible rectangle to capture hover events
      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", () => {
          tooltipDiv.style("display", null);
          mouseLine.style("opacity", 1);
        })
        .on("mousemove", function (event) {
          const containerRect = document
            .querySelector(".svg-container")
            .getBoundingClientRect();
          const bisectDate = d3.bisector((d) => d.time).left;
          const x0 = xScale.invert(d3.pointer(event, this)[0]);
          const i = bisectDate(formattedData, x0, 1);
          const d0 = formattedData[i - 1];
          const d1 = formattedData[i];
          const d =
            d0 && d1 ? (x0 - d0.time > d1.time - x0 ? d1 : d0) : d0 ? d0 : d1;
          tooltipDiv
            .style("opacity", 1)
            .style("display", "block")
            .style("left", containerRect.left + xScale(d.time) + 20 + "px")
            .style("top", containerRect.top + yScale(d.close) + 20 + "px")
            .html(
              `Time: ${new Date(d.time)
                .getHours()
                .toString()
                .padStart(2, "0")}:${new Date(d.time)
                .getMinutes()
                .toString()
                .padStart(2, "0")} ${
                new Date(d.time).getHours() < 12 ? "AM" : "PM"
              } <br/>Close: ${d.close} <br/>Open: ${d.open} <br/>High: ${
                d.high
              } <br/>Low: ${d.low}<br/>Volume: ${d.volume}`
            );
          // .attr(
          //   "transform",
          //   `translate(${xScale(d.time)},${yScale(d.close)})`
          // );
          //  console.log(`translate(${xScale(d.time)},${yScale(d.close)})`);
          mouseLine
            .attr("x1", xScale(d.time))
            .attr("x2", xScale(d.time))
            .attr("y1", 0)
            .attr("y2", height)
            .style("opacity", 0.5);
        })
        .on("mouseout", () => {
          tooltipDiv.style("display", "none");
          mouseLine.style("opacity", 0);
        });
    }
  }

  useEffect(() => {
    if (containerWidth > 0) {
      drawChart(containerWidth);
    }
  }, [containerWidth, data]);
  return (
    <>
      {" "}
      <svg
        className="linear-chart"
        ref={d3Container}
        style={{ width: "100%" }}
      />
      <div ref={tooltip} />{" "}
    </>
  );
};

export default LinearChart;
