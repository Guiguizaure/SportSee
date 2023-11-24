import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { UserMainData } from "../../data/types";

interface ScoreChartProps {
  userData: UserMainData;
}

const ScoreChart: React.FC<ScoreChartProps> = ({ userData }) => {
  const score = userData.todayScore ?? userData.score ?? 0;
  const displayScore = score * 100; // Convert to percentage for display

  const data = [{ name: "Score", score, fill: "#FF0000" }];

  return (
    <div className="score-chart-container bg-light-grey rounded-[5px] w-full max-w-[258px] h-[263px] p-4 relative">
      <h3 className="text-[15px] mt-[8px] ml-[12px] text-blue-grey font-[500]">
        Score
      </h3>
      <ResponsiveContainer width="100%" height="250px" aspect={1}>
        <RadialBarChart
          innerRadius="75%"
          outerRadius="87%"
          startAngle={215}
          endAngle={-145}
          data={data}
          cx="50%"
          cy="50%"
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 1]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar dataKey="score" cornerRadius={50} fill="#FF0000">
            {/* The label should be a child of RadialBar */}
          </RadialBar>
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="central-circle bg-white shadow-scorechart absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full"></div>
      <div className="score-label flex flex-col items-center max-w-[94px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-[26px] text-dark-grey font-bold">{`${displayScore.toFixed(
          0
        )}%`}</p>
        <p className="text-[16px] text-center font-[500] text-grey">
          de votre objectif
        </p>
      </div>
    </div>
  );
};

export default ScoreChart;
