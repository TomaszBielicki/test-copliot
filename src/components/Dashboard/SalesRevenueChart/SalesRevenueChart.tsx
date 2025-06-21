import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface SalesRevenueChartProps {
  data: { date: string; revenue: number }[];
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
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={chartColors[2]}
          fill={chartColors[2]}
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  </motion.div>
);

export default SalesRevenueChart;
