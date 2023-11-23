import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { UserAverageSessions } from "../../data/types";

interface AverageSessionsChartProps {
  averageSessionsData: UserAverageSessions;
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const AverageSessionsChart: React.FC<AverageSessionsChartProps> = ({
  averageSessionsData,
}) => {
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  const data = averageSessionsData.sessions.map((session) => ({
    day: days[session.day - 1],
    sessionLength: session.sessionLength,
  }));

  return (
    <div className="average-sessions-chart flex items-end bg-red rounded-[5px] max-w-[256px]">
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* SVG definitions for gradient */}
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#FFFFFF" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="url(#colorUv)"
            strokeWidth={4}
            activeDot={{ r: 8 }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessionsChart;
