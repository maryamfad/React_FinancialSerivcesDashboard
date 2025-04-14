import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const MultiIndexDiagram = ({ data, symbols }) => {
	const svgRef = useRef();
	const containerRef = useRef();
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		// Initialize resize observer
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				setContainerWidth(entry.contentRect.width);
			}
		});
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}
		return () => {
			if (containerRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				resizeObserver.unobserve(containerRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [containerRef.current]);

	useEffect(() => {
		if (containerWidth > 0) {
			drawChart(containerWidth);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [containerWidth, data]);

	function drawChart(width) {
		if (data && containerRef.current && data.length > 0 && width > 0) {
			const margin = { top: 20, right: 20, bottom: 30, left: 40 },
				height = 300 - margin.top - margin.bottom;

			const svg = d3
				.select(svgRef.current)
				.html("") // Clear previous SVG elements
				.append("svg")
				.attr("width", "100%")
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", `translate(${margin.left},${margin.top})`);

			const parseTime = d3.utcParse("%Y-%m-%d");

			// Convert time to Date object
			data.forEach((d) => {
				d.date = parseTime(d.time);
			});

			// Scale for X (time) and Y (values)
			const x = d3
				.scaleTime()
				.domain(d3.extent(data, (d) => d.date))
				.range([0, width]);

			const y = d3
				.scaleLinear()
				.domain([
					d3.min(data, (d) =>
						Math.min(...symbols.map((s) => d[s] ?? Infinity))
					),
					d3.max(data, (d) =>
						Math.max(...symbols.map((s) => d[s] ?? -Infinity))
					),
				])
				.nice()
				.range([height, 0]);

			const color = d3.scaleOrdinal(d3.schemeTableau10).domain(symbols);

			const line = d3
				.line()
				.defined((d) => d.value !== undefined)
				.x((d) => x(d.date))
				.y((d) => y(d.value));

			// Process and add paths for each symbol
			symbols.forEach((symbol) => {
				const symbolData = data
					.map((d) => ({
						date: d.date,
						value: d[symbol],
					}))
					.filter((d) => d.value !== undefined); // Filter out undefined values

				if (symbolData.length) {
					svg.append("path")
						.datum(symbolData)
						.attr("fill", "none")
						.attr("stroke", color(symbol))
						.attr("stroke-width", 2)
						.attr("d", line);
				}
			});

			// Add X and Y Axis
			svg.append("g")
				.attr("transform", `translate(0,${height})`)
				.call(d3.axisBottom(x).ticks(6))
				.append("text")
				.attr("x", width / 2)
				.attr("y", 25)
				.attr("text-anchor", "middle")
				.attr("fill", "#000")
				.text("Date");

			svg.append("g")
				.call(d3.axisLeft(y))
				.append("text")
				.attr("x", -height / 2)
				.attr("y", -40)
				.attr("text-anchor", "middle")
				.attr("fill", "#000")
				.attr("transform", "rotate(-90)")
				.text("Close Price");
		}
	}
	return (
		<div ref={containerRef} style={{ width: "100%", height: "300px" }}>
			<div ref={svgRef}></div>
		</div>
	);
};

export default MultiIndexDiagram;
