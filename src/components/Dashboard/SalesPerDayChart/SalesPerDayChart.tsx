import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface SalesPerDayChartProps {
  data: { date: string; count: number }[];
  chartCard: string;
  chartTitle: string;
  chartColors: string[];
}

const SalesPerDayChart: React.FC<SalesPerDayChartProps> = ({
  data,
  chartCard,
  chartTitle,
  chartColors,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className={chartCard}
  >
    <div className={chartTitle}>Sales per Day</div>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill={chartColors[0]} />
      </BarChart>
    </ResponsiveContainer>
  </motion.div>
);

export default SalesPerDayChart;
