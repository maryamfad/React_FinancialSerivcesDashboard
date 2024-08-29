import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const LinearChart = ({ data }) => {
	const d3Container = useRef(null);
	const tooltip = useRef(null);
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		// Initialize resize observer
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				setContainerWidth(
					entry.contentRect.width - entry.contentRect.width / 10
				);
			}
		});
		if (d3Container.current) {
			resizeObserver.observe(d3Container.current);
		}
		return () => {
			if (d3Container.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				resizeObserver.unobserve(d3Container.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [d3Container.current]);

	function drawChart(width) {
		if (data && d3Container.current && data.length > 0 && width > 0) {
			d3.select(d3Container.current).selectAll("*").remove();
			data.sort((a, b) => a.date - b.date);
			const formattedData = data.map((d) => ({
				date: new Date(d.date),
				value: d.value,
			}));

			const margin = { top: 10, right: 20, bottom: 30, left: 40 },
				height = 280 - margin.top - margin.bottom;

			const svg = d3
				.select(d3Container.current)
				.attr("class", "svg-container")
				.attr("width", "100%")
				.attr("height", height + margin.top + margin.bottom)
				.on("mouseout", () => tooltipDiv.style("display", "none"))
				.append("g")
				.attr("transform", `translate(${margin.left},${margin.top})`);

			const xScale = d3
				.scaleTime()
				.domain(d3.extent(formattedData, (d) => d.date))
				.range([0, width]);

			const yScale = d3
				.scaleLinear()
				.domain([
					d3.min(formattedData, (d) => d.value) -
						d3.min(formattedData, (d) => d.value) * 0.01,
					d3.max(formattedData, (d) => d.value) +
						d3.max(formattedData, (d) => d.value) * 0.01,
				])
				.range([height, 0]);

			svg.append("g")
				.attr("transform", `translate(0,${height})`)
				.call(d3.axisBottom(xScale));

			svg.append("g").call(d3.axisLeft(yScale));

			svg.append("g")
				.call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
				.style("color", "lightgray")
				.selectAll(".tick line")
				.style("stroke", "lightgray")
				.style("stroke-opacity", "0.7")
				.style("shape-rendering", "crispEdges")
				.classed("grid", true);

			svg.append("g")
				.attr("transform", `translate(0,${height})`)
				.call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""))
				.style("color", "lightgray")
				.selectAll(".tick line")
				.style("stroke", "lightgray")
				.style("stroke-opacity", "0.7")
				.style("shape-rendering", "crispEdges")
				.classed("grid", true);

			const valueline = d3
				.line()
				.x((d) => xScale(d.date))
				.y((d) => yScale(d.value));

			svg.append("path")
				.data([formattedData])
				.attr("class", "line")
				.attr("d", valueline)
				.style("stroke", "#FFA630")
				.style("fill", "none")
				.style("stroke-width", "2px");

			const tooltipDiv = d3
				.select(tooltip.current)
				.style("opacity", 0)
				.attr("class", "tooltip")
				.style("background-color", "white")
				.style("border", "solid")
				.style("border-width", "2px")
				.style("border-radius", "5px")
				.style("padding", "5px")
				.style("z-index", 3);

			const mouseLine = svg
				.append("line")
				.attr("stroke", "#000")
				.attr("stroke-width", 1)
				.style("opacity", 0);

			// Invisible rectangle to capture hover events
			svg.append("rect")
				.attr("width", width)
				.attr("height", height)
				.style("fill", "none")
				.style("pointer-events", "all")
				.on("mouseover", () => {
					mouseLine.style("opacity", 1);
				})
				.on("mousemove", function (event) {
					const containerRect = document
						.querySelector(".svg-container")
						.getBoundingClientRect();
					const bisectDate = d3.bisector((d) => d.date).left;
					const mouseX = d3.pointer(event)[0];
					const x0 = xScale.invert(mouseX);
					const i = bisectDate(formattedData, x0, 1);
					const d0 = formattedData[i - 1];
					const d1 = formattedData[i];
					const d =
						d0 && d1
							? x0 - d0.date > d1.date - x0
								? d1
								: d0
							: d0
							? d0
							: d1;
					tooltipDiv
						.style("opacity", 1)
						.style("display", "block")
						.style(
							"left",
							containerRect.left + xScale(d.date) + 20 + "px"
						)
						.style(
							"top",
							containerRect.top + yScale(d.value) + 20 + "px"
						)
						.html(
							`Time: ${new Date(d.date)
								.getHours()
								.toString()
								.padStart(2, "0")}:${new Date(d.date)
								.getMinutes()
								.toString()
								.padStart(2, "0")} ${
								new Date(d.date).getHours() < 12 ? "AM" : "PM"
							} <br/>value: ${d.value} `
						);

					mouseLine
						.attr("x1", xScale(d.date))
						.attr("x2", xScale(d.date))
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
