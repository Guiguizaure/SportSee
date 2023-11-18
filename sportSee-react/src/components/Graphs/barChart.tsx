import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Session } from "../../data/types";

const CustomBarChart = ({ sessions }: { sessions: Session[] }) => {
  // Create a new array of sessions with index-based 'day' for the x-axis.
  const indexedSessions = sessions.map((session, index) => ({
    ...session,
    day: index + 1, // Convert day string to index starting at 1
  }));

  return (
    <ResponsiveContainer className="max-w-[836px]" width="100%" height={300}>
      <BarChart
        data={indexedSessions}
        margin={{
          top: 20, // Distance from the top of the chart to the top of the SVG
          right: 30, // Distance from the chart to the right side of the SVG (increases space for YAxis labels)
          left: 20, // Distance from the chart to the left side of the SVG
          bottom: 20, // Distance from the chart to the bottom of the SVG (increases space for XAxis labels)
        }}
        barCategoryGap="30%" // Controls the gap between each pair of bars
        barGap={8} // Controls the gap between bars within a pair
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" padding={{ left: 0, right: 0 }} />
        <YAxis
          yAxisId="left"
          orientation="right"
          domain={[69, 91]}
          allowDataOverflow
          type="number"
          ticks={[69, 80, 91]} // Specify exact ticks to display
          tickCount={3} // Set the number of ticks (including the domain's start and end)
        />
        <YAxis yAxisId="right" orientation="right" hide />
        <Tooltip />
        <Legend
          iconType="circle"
          verticalAlign="top"
          wrapperStyle={{ lineHeight: "40px" }}
        />
        <Bar
          yAxisId="right"
          dataKey="calories"
          fill="#282D30"
          barSize={10}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          yAxisId="left"
          dataKey="kilogram"
          fill="#FF0101"
          barSize={10}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
