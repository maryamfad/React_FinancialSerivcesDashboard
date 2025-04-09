import * as d3 from "d3";
import { useEffect, useRef } from "react";

const MultiIndexDiagram = ({ data, symbols }) => {
	const svgRef = useRef();

	useEffect(() => {
		if (!data.length || !symbols.length) return;

		const margin = { top: 20, right: 50, bottom: 30, left: 50 };
		const width = 800 - margin.left - margin.right;
		const height = 400 - margin.top - margin.bottom;

		const svg = d3
			.select(svgRef.current)
			.html("")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		const parseTime = d3.utcParse("%Y-%m-%d");

		// Convert time to Date object
		data.forEach((d) => {
			d.date = parseTime(d.time);
		});

		const x = d3
			.scaleTime()
			.domain(d3.extent(data, (d) => d.date))
			.range([0, width]);

		const y = d3
			.scaleLinear()
			.domain([
				d3.min(data, (d) => Math.min(...symbols.map((s) => d[s] ?? Infinity))),
				d3.max(data, (d) => Math.max(...symbols.map((s) => d[s] ?? -Infinity))),
			])
			.nice()
			.range([height, 0]);

		const color = d3.scaleOrdinal(d3.schemeTableau10).domain(symbols);

		const line = d3
			.line()
			.defined((d) => d.value !== undefined)
			.x((d) => x(d.date))
			.y((d) => y(d.value));

		symbols.forEach((symbol) => {
			const symbolData = data.map((d) => ({
				date: d.date,
				value: d[symbol],
			}));

			svg
				.append("path")
				.datum(symbolData)
				.attr("fill", "none")
				.attr("stroke", color(symbol))
				.attr("stroke-width", 2)
				.attr("d", line);
		});

		svg
			.append("g")
			.attr("transform", `translate(0,${height})`)
			.call(d3.axisBottom(x).ticks(6));

		svg.append("g").call(d3.axisLeft(y));
	}, [data, symbols]);

	return <div ref={svgRef}></div>;
};

export default MultiIndexDiagram;