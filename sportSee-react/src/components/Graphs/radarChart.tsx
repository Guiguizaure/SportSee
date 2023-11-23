import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { UserPerformance } from "../../data/types";

interface RadarChartProps {
  userData: UserPerformance;
}

const CustomRadarChart: React.FC<RadarChartProps> = ({ userData }) => {
  const kind = userData.kind as Record<string, string>;

  const order = ["6", "5", "4", "3", "2", "1"];

  // Map the data to the desired order
  const chartData = order.map((kindKey) => {
    const item = userData.data.find((d) => d.kind.toString() === kindKey);
    return {
      subject: kind[kindKey],
      A: item ? item.value : 0, // Use the value if the item exists
      fullMark: 150,
    };
  });

  return (
    <RadarChart
      className="radar-chart max-w-[258px] bg-dark-grey rounded-[5px]"
      outerRadius={90}
      width={258} // Width of the actual RadarChart
      height={250} // Height of the actual RadarChart
      data={chartData}
      margin={{ top: 0, right: 215, bottom: 0, left: 0 }}
    >
      {/* Optionally include and style the PolarGrid if you want to keep the circular grid lines */}
      <PolarGrid stroke="#FFFFFF" />

      {/* Style the axes and labels in white */}
      <PolarAngleAxis
        dataKey="subject"
        tick={({ payload, x, y, textAnchor, ...rest }) => {
          // Default y-coordinate adjustment is 0
          let yOffset = 0;

          // Adjust the yOffset based on the payload value
          switch (payload.value) {
            case "Intensity":
              yOffset = -20; // Move 'Intensity' up
              break;
            case "Endurance":
              yOffset = 10; // Move 'Endurance' down
              break;
            // Add cases for other labels if needed
          }

          // Apply the y-coordinate adjustment
          y += yOffset;

          return (
            <text
              x={x}
              y={y}
              textAnchor={textAnchor}
              {...rest}
              fill="white" // Set the fill to white for text color
              style={{ fontSize: "12px" }} // You can adjust the font size here
            >
              {payload.value}
            </text>
          );
        }}
      />

      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      <Radar
        name={`User ${userData.userId}`}
        dataKey="A"
        stroke="#E60000" // Adjust the stroke color as needed
        fill="#E60000" // Adjust the fill color as needed
        fillOpacity={0.7} // Adjust the fill opacity as needed
      />
    </RadarChart>
  );
};

export default CustomRadarChart;
