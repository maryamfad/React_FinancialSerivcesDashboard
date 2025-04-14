import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const MultiIndexDiagram = ({ data, symbols }) => {
	const svgRef = useRef();
	const tooltip = useRef(null);
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
	data.forEach((d) => {
		d.parsedDate = new Date(d.date);
	});
	function drawChart(width) {
		if (data && containerRef.current && data.length > 0 && width > 0) {
			const margin = { top: 20, right: 20, bottom: 30, left: 40 },
				height = 300 - margin.top - margin.bottom;

			const svg = d3
				.select(svgRef.current)
				.html("")
				.attr("class", "svg-container")
				.append("svg")
				.attr("width", "100%")
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", `translate(${margin.left},${margin.top})`);

			const x = d3
				.scaleTime()
				.domain(d3.extent(data, (d) => new Date(d.date)))
				.range([0, width]);

			const y = d3
				.scaleLinear()
				.domain([
					d3.min(data, (d) =>
						Math.min(
							...symbols.map(
								(s) => d[s]?.changePercent ?? Infinity
							)
						)
					),
					d3.max(data, (d) =>
						Math.max(
							...symbols.map(
								(s) => d[s]?.changePercent ?? -Infinity
							)
						)
					),
				])
				.nice()
				.range([height, 0]);

			const color = d3.scaleOrdinal(d3.schemeTableau10).domain(symbols);

			const line = d3
				.line()
				.x((d) => x(new Date(d.date)))
				.y((d) => y(d.value));

			// Tooltip setup
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

			// Mouse move line
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
					const bisectDate = d3.bisector(
						(d) => new Date(d.date)
					).left;
					const mouseX = d3.pointer(event)[0];
					const x0 = x.invert(mouseX);
					const i = bisectDate(data, x0, 1);
					const d0 = data[i - 1];
					const d1 = data[i];
					const d =
						d0 && d1
							? x0 - new Date(d0.date) > new Date(d1.date) - x0
								? d1
								: d0
							: d0 || d1;

					tooltipDiv
						.style("opacity", 1)
						.style("display", "block")
						.style("left", event.pageX + 15 + "px") // tooltip follows the cursor
						.style("top", event.pageY - 28 + "px")
						.html(() => {
							return `Date: ${d.date}`;
						});

					mouseLine
						.attr("x1", x(new Date(d.date)))
						.attr("x2", x(new Date(d.date)))
						.attr("y1", 0)
						.attr("y2", height)
						.style("opacity", 0.5);
				})
				.on("mouseout", () => {
					tooltipDiv.style("display", "none");
					mouseLine.style("opacity", 0);
				});
			// Process and add paths for each symbol
			symbols.forEach((symbol) => {
				const symbolData = data
					.map((d) => {
						const entry = d[symbol];
						return entry
							? { date: d.date, value: entry.changePercent }
							: null;
					})
					.filter((d) => d && d.value !== undefined);

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
				.text("Change Percentage");
		}
	}
	return (
		<div ref={containerRef} style={{ width: "100%", height: "300px" }}>
			<div ref={svgRef}></div>
			<div ref={tooltip} />
		</div>
	);
};

export default MultiIndexDiagram;
