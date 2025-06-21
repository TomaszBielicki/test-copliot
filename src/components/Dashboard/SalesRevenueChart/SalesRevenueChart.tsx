import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
} from "recharts";
import { motion } from "framer-motion";

interface SalesRevenueChartProps {
  data: { date: string; revenue: number; sold_quantity: number }[];
  chartCard: string;
  chartTitle: string;
  chartColors: string[];
}

const SalesRevenueChart: React.FC<SalesRevenueChartProps> = ({
  data,
  chartCard,
  chartTitle,
  chartColors,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className={chartCard}
  >
    <div className={chartTitle}>Cumulative Sales Revenue</div>
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data}>
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip
          formatter={(value: any, name: string) => {
            if (name === "Cumulative Revenue") {
              return [`${value} zł`, "Cumulative Revenue"];
            }
            if (name === "Sold Quantity") {
              return [`${value} szt.`, "Sold Quantity"];
            }
            return [value, name];
          }}
          labelFormatter={(label) => `Data: ${label}`}
        />
        <Legend
          formatter={(value) =>
            value === "revenue"
              ? "Cumulative Revenue"
              : value === "sold_quantity"
              ? "Sold Quantity"
              : value
          }
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          stroke={chartColors[2]}
          fill={chartColors[2]}
          fillOpacity={0.2}
          name="Cumulative Revenue"
        />
        <Bar
          yAxisId="right"
          dataKey="sold_quantity"
          fill={chartColors[3]}
          name="Sold Quantity"
          barSize={20}
        />
      </AreaChart>
    </ResponsiveContainer>
  </motion.div>
);

export default SalesRevenueChart;
