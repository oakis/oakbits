import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PlayerGraphData } from "./config";
import { getHighestNumber, getLowestNumber } from "@/utils/array";
import useIsMobile from "@/hooks/useIsMobile";

interface LineGraphProps {
  data: PlayerGraphData[];
}

const YAxisTicks = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300];

const getYAxisDomain = (data: PlayerGraphData[]): [number, number, number] => {
  const highestStr = getHighestNumber(data, "strength");
  const highestAvg = getHighestNumber(data, "average");
  const highestMonthAvg = getHighestNumber(data, "monthAverage");
  const lowestStr = getLowestNumber(data, "strength");
  const lowestAvg = getLowestNumber(data, "average");
  const lowestMonthAvg = getLowestNumber(data, "monthAverage");
  const max = Math.max(highestStr, highestAvg, highestMonthAvg);
  const min = Math.min(lowestStr, lowestAvg, lowestMonthAvg);

  const closestUpper =
    YAxisTicks.find((num) => num >= max) ?? YAxisTicks[YAxisTicks.length - 1];
  const closestLower =
    [...YAxisTicks].reverse().find((num) => num <= min) ?? YAxisTicks[0];

  const lowerIndex = YAxisTicks.indexOf(closestLower);
  const upperIndex = YAxisTicks.indexOf(closestUpper);
  const countInBetween = upperIndex - lowerIndex + 1;

  return [closestLower, closestUpper, countInBetween];
};

const LineGraph = ({ data }: LineGraphProps) => {
  const isMobile = useIsMobile();
  const [lower, upper, ticks] = getYAxisDomain(data);
  return (
    <ResponsiveContainer height={isMobile ? 300 : 500} width="100%">
      <LineChart
        data={data}
        margin={{ top: 0, right: 5, bottom: -15, left: -20 }}
      >
        <CartesianGrid stroke="rgb(241 245 249)" />
        <XAxis
          dataKey="xAxisText"
          height={75}
          angle={-45}
          textAnchor="end"
          interval={0}
          fontSize={12}
          fontWeight={600}
          style={{ fill: "rgb(71 85 105)" }}
        />
        <YAxis
          domain={[lower, upper]}
          tickCount={ticks}
          fontWeight={600}
          style={{ fill: "rgb(71 85 105)" }}
        />
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          align="right"
          iconType="plainline"
          wrapperStyle={{ fontSize: "14px" }}
        />
        <Line
          type="monotone"
          dataKey="strength"
          name="Spelstyrka"
          connectNulls
          stroke="rgb(253, 159, 7)"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="average"
          name="Snitt"
          connectNulls
          stroke="rgb(128, 128, 0)"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="monthAverage"
          name="Faktiskt snitt"
          connectNulls
          stroke="rgb(71, 85, 105)"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
