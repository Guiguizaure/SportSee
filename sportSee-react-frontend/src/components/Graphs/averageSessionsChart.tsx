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
      <div className="custom-tooltip w-[39px] h-[25px] bg-light-grey flex justify-center items-center">
        <p className="label text-[8px] font-[500]">{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const AverageSessionsChart: React.FC<AverageSessionsChartProps> = ({
  averageSessionsData,
}) => {
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  // Extend the session data with invisible points at the start and end
  const extendedData = [
    { day: "", sessionLength: averageSessionsData.sessions[0].sessionLength }, // Invisible point with the same length as the first visible point
    ...averageSessionsData.sessions.map((session) => ({
      day: days[session.day - 1],
      sessionLength: session.sessionLength,
    })),
    {
      day: "",
      sessionLength:
        averageSessionsData.sessions[averageSessionsData.sessions.length - 1]
          .sessionLength,
    }, // Invisible point with the same length as the last visible point
  ];

  //   const data = averageSessionsData.sessions.map((session) => ({
  //     day: days[session.day - 1],
  //     sessionLength: session.sessionLength,
  //   }));

  return (
    <div className="average-sessions-chart relative flex flex-grow items-end bg-red rounded-[5px] max-w-[256px] min-h-[263px]">
      <h3 className="text-white font-[500] opacity-[0.5] absolute top-[29px] left-[34px] max-w-[147px]">
        Durée moyenne des sessions
      </h3>
      <ResponsiveContainer width="100%" height={180} className="pb-[12px]">
        <LineChart
          data={extendedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* SVG definitions for gradient */}
          <defs>
            <linearGradient id="colorUv" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.9} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#FFFFFF50" }}
            padding={{ left: -35, right: -45 }}
          />
          <Tooltip
            cursor={false}
            isAnimationActive={false}
            content={<CustomTooltip />}
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="url(#colorUv)"
            strokeWidth={3}
            activeDot={{
              r: 5,
              fill: "white",
              stroke: "none",
            }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessionsChart;
