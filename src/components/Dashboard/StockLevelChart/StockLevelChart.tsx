import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface StockLevelChartProps {
  data: { date: string; stock: number }[];
  chartCard: string;
  chartTitle: string;
  chartColors: string[];
}

const StockLevelChart: React.FC<StockLevelChartProps> = ({
  data,
  chartCard,
  chartTitle,
  chartColors,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className={chartCard}
  >
    <div className={chartTitle}>Stock Level Over Time</div>
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="stock"
          stroke={chartColors[1]}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>
);

export default StockLevelChart;
