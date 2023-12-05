import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  TooltipProps,
} from "recharts";

interface Session {
  kilogram: number;
  calories: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomBarChart = ({ sessions }: { sessions: Session[] }) => {
  const data = sessions.map((session, index) => ({
    day: index + 1,
    Kilogram: session.kilogram,
    Calories: session.calories,
  }));

  const kgValues = sessions.map((s) => s.kilogram);
  const calValues = sessions.map((s) => s.calories);
  const minKg = Math.min(...kgValues) - 5;
  const maxKg = Math.max(...kgValues) + 5;
  const minCal = Math.min(...calValues) - 50;
  const maxCal = Math.max(...calValues) + 50;
  const middleKg = (minKg + maxKg) / 2;

  const [xAxisPadding, setXAxisPadding] = useState({ left: -45, right: -45 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1400) {
        setXAxisPadding({ left: -28, right: -28 });
      } else {
        setXAxisPadding({ left: -45, right: -45 });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip flex flex-col text-white"
          style={{
            backgroundColor: "#FF0101",
          }}
        >
          <p className="label text-[7px] font-[500] p-[10px]">{`${payload[0].value}kg`}</p>
          <p className="label text-[7px] font-[500] p-[10px]">{`${payload[1].value}kcal`}</p>
        </div>
      );
    }
    return null;
  };

  // const CustomXTick = (props: CustomTickProps) => {
  //   const { x, y, payload } = props;
  //   return (
  //     <g transform={`translate(${x},${y})`}>
  //       <text x={-3} y={0} dy={16} fill="#9B9EAC" fontSize={14}>
  //         {payload.value}
  //       </text>
  //     </g>
  //   );
  // };

  // const CustomYTick = (props: CustomTickProps) => {
  //   const { x, y, payload } = props;
  //   return (
  //     <g transform={`translate(${x},${y})`}>
  //       <text x={0} y={0} dy={3} fill="#9B9EAC" fontSize={14}>
  //         {payload.value}
  //       </text>
  //     </g>
  //   );
  // };

  const renderCustomLegend = () => {
    return (
      <ul className="absolute flex gap-[32px] right-[26px] top-[-24px]">
        <li className="flex gap-[12px] justify-center items-center">
          <svg height="8" width="8">
            <circle cx="4" cy="4" r="4" fill="#282D30" />
          </svg>
          <span className="text-grey text-[14px]">Poids (kg)</span>
        </li>
        <li className="flex gap-[12px] justify-center items-center">
          <svg height="8" width="8">
            <circle cx="4" cy="4" r="4" fill="#FF0101" />
          </svg>
          <span className="text-grey text-[14px]">Calories brûlées (kCal)</span>
        </li>
      </ul>
    );
  };

  return (
    <div className="bar_chart__wrapper bg-light-grey rounded-[5px] p-[24px_0px_40px_12px]">
      <h3 className="chart-title ml-[20px] mb-[35px] text-blue-grey text-[15px] font-[500px]">
        Activité quotidienne
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barCategoryGap={0}
          barGap={10}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            padding={xAxisPadding}
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={16}
                  fill="#9B9EAC"
                  fontSize={14}
                  textAnchor="middle"
                >
                  {payload.value}
                </text>
              </g>
            )}
          />
          <YAxis
            yAxisId="kg"
            orientation="right"
            domain={[minKg, maxKg]}
            ticks={[minKg, middleKg, maxKg]}
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={3}
                  fill="#9B9EAC"
                  fontSize={14}
                  textAnchor="middle"
                >
                  {payload.value}
                </text>
              </g>
            )}
            tickLine={false}
            axisLine={false}
            tickMargin={34}
          />
          <YAxis
            yAxisId="cal"
            orientation="right"
            domain={[minCal, maxCal]}
            hide={true}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(196, 196, 196, 0.5)" }}
          />
          <Legend
            content={renderCustomLegend}
            wrapperStyle={{ top: -30, right: 0 }}
          />
          <ReferenceLine
            y={minKg}
            stroke="#DEDEDE"
            strokeDasharray="1"
            yAxisId="kg"
          />
          <ReferenceLine
            y={middleKg}
            stroke="#DEDEDE"
            strokeDasharray="3 3"
            yAxisId="kg"
          />
          <ReferenceLine
            y={maxKg}
            stroke="#DEDEDE"
            strokeDasharray="3 3"
            yAxisId="kg"
          />
          <Bar
            yAxisId="kg"
            dataKey="Kilogram"
            fill="#FF0101"
            radius={[10, 10, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="cal"
            dataKey="Calories"
            fill="#282D30"
            radius={[10, 10, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
