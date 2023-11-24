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
      className="radar-chart max-w-[258px] min-h-[263px] bg-dark-grey rounded-[5px]"
      outerRadius={90}
      width={258} // Width of the actual RadarChart
      height={250} // Height of the actual RadarChart
      data={chartData}
      margin={{ top: 0, right: 215, bottom: 0, left: 0 }}
    >
      <PolarGrid stroke="#FFFFFF" />

      <PolarAngleAxis
        dataKey="subject"
        tick={({ payload, x, y, textAnchor, ...rest }) => {
          let yOffset = 0;

          switch (payload.value) {
            case "Intensity":
              yOffset = -20;
              break;
            case "Endurance":
              yOffset = 10;
              break;
          }

          y += yOffset;

          return (
            <text
              x={x}
              y={y}
              textAnchor={textAnchor}
              {...rest}
              fill="white"
              style={{ fontSize: "12px" }}
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
        stroke="#E60000"
        fill="#E60000"
        fillOpacity={0.7}
      />
    </RadarChart>
  );
};

export default CustomRadarChart;
