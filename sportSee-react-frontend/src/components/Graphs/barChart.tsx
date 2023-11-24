import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  // CartesianGrid,
} from "recharts";

// Assuming this is your Session type structure
interface Session {
  kilogram: number;
  calories: number;
}

const CustomBarChart = ({ sessions }: { sessions: Session[] }) => {
  // Prepare the data for Recharts
  const data = sessions.map((session, index) => ({
    day: index + 1, // Assuming day is simply the index + 1
    Kilogram: session.kilogram,
    Calories: session.calories,
  }));

  return (
    <div
      className="bg-light-grey rounded-[5px] p-[24px_0px_40px_12px]"
      style={{ width: "835px", height: "320px" }}
    >
      <h3 className="chart-title ml-[20px] mb-[35px]">Activité quotidienne</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barCategoryGap={0}
          barGap={6}
        >
          {/* <CartesianGrid strokeDasharray="5 3" /> */}
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={15}
          />
          <YAxis
            yAxisId="kg"
            orientation="right"
            domain={[70, 90]}
            ticks={[70, 80, 90]}
            tickLine={false}
            axisLine={false}
            tickMargin={30}
          />
          <YAxis
            yAxisId="cal"
            orientation="right"
            domain={[100, 500]}
            hide={true}
          />
          {/* <CartesianGrid vertical={true} strokeDasharray="5 3" /> */}
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ top: 0, right: 0 }}
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
