import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Session } from "../../data/types";

const D3BarChart = ({ sessions }: { sessions: Session[] }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null); // Ref for the tooltip

  useEffect(() => {
    if (chartRef.current === null) {
      return;
    }

    // Adjusted margins to account for the title and legend
    const margin = { top: 40, right: 120, bottom: 20, left: 20 };
    const width = 800; // Total width of the SVG
    const chartHeight = 145; // The height of the actual chart area
    const totalHeight = 320; // Total height of the SVG to include title and legend

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", totalHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Title at the top-left
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -10) // Adjust y position to fit at the top
      .attr("class", "chart-title")
      .text("Activité quotidienne");

    // Create the main group element for the chart
    // const g = svg
    //   .append("g")
    //   .attr(
    //     "transform",
    //     `translate(${margin.left},${chartHeight - margin.bottom})`
    //   );

    // Using scaleBand for the x-axis with indices as domain
    const xScale = d3
      .scaleBand()
      .range([0, width - margin.right - margin.left])
      .domain(sessions.map((_, i) => String(i + 1)))
      .padding(0.3);

    // Y scale for kilograms
    const yScaleKg = d3
      .scaleLinear()
      .domain([69, 89]) // The kg domain
      .range([chartHeight, 0]);

    // Y scale for calories
    const yScaleCalories = d3
      .scaleLinear()
      .domain([100, 500]) // The calorie domain
      .range([chartHeight, 0]); // Use the same range so that the bars align

    // Draw the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0));

    // Draw the y-axis for kilograms
    svg
      .append("g")
      .attr("transform", `translate(${width - margin.right - margin.left},0)`)
      .call(d3.axisRight(yScaleKg).ticks(3).tickValues([69, 79, 89]));

    // Tooltip setup
    const tooltip = d3.select(tooltipRef.current);

    // Function to show tooltip
    const onMouseOver = (
      event: React.MouseEvent<SVGRectElement, MouseEvent>,
      d: Session
    ) => {
      tooltip.style("opacity", 1);
      tooltip
        .html(`Kilogram: ${d.kilogram}<br/>Calories: ${d.calories}`)
        .style("left", `${event.pageX + 15}px`)
        .style("top", `${event.pageY}px`);
    };

    // Function to hide tooltip
    const onMouseOut = () => {
      tooltip.style("opacity", 0);
    };

    // Drawing kilogram bars
    svg
      .selectAll(".bar.kilogram")
      .data(sessions)
      .enter()
      .append("rect")
      .attr("class", "bar kilogram")
      .attr("x", (d, i) => xScale(String(i + 1)) ?? 0)
      .attr("y", (d) => yScaleKg(d.kilogram))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => chartHeight - yScaleKg(d.kilogram))
      .attr("fill", "#FF0101")
      .attr("ry", 5)
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut);

    // Drawing calorie bars
    svg
      .selectAll(".bar.calories")
      .data(sessions)
      .enter()
      .append("rect")
      .attr("class", "bar calories")
      .attr(
        "x",
        (d, i) => (xScale(String(i + 1)) ?? 0) + xScale.bandwidth() / 2
      )
      .attr("y", (d) => yScaleCalories(d.calories))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => chartHeight - yScaleCalories(d.calories))
      .attr("fill", "#282D30")
      .attr("ry", 5)
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut);

    // Horizontal grid lines for each y tick value
    const yTickValues = [69, 79, 89];
    yTickValues.forEach((tickValue) => {
      svg
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yScaleKg(tickValue))
        .attr("y2", yScaleKg(tickValue))
        .attr("stroke", "#ccc")
        .attr("stroke-dasharray", "2,2");
    });

    // Legend at the top-right
    const legend = svg
      .append("g")
      .attr("class", "chart-legend")
      .attr("transform", `translate(${width - margin.right + 10},0)`);

    const legendItems = ["Kilogram", "Calories"];
    legend
      .selectAll("g")
      .data(legendItems)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`)
      .each(function (d, i) {
        d3.select(this)
          .append("circle")
          .attr("cx", 0)
          .attr("cy", 10)
          .attr("r", 5)
          .attr("fill", d === "Kilogram" ? "#FF0101" : "#282D30");

        d3.select(this)
          .append("text")
          .attr("x", 20)
          .attr("y", 10)
          .attr("dy", "0.35em")
          .text(d);
      });
  }, [sessions]);

  return (
    <>
      <div className="bar_chart" ref={chartRef} />
      <div
        ref={tooltipRef}
        style={{
          opacity: 0,
          position: "absolute",
          textAlign: "center",
          width: "120px",
          height: "auto",
          padding: "8px",
          fontSize: "12px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #000",
          borderRadius: "4px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </>
  );
};

export default D3BarChart;
