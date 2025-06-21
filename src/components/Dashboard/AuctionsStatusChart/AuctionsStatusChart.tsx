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

interface AuctionsStatusChartProps {
  data: { status: string; value: number }[];
  chartCard: string;
  chartTitle: string;
  chartColors: string[];
}

const AuctionsStatusChart: React.FC<AuctionsStatusChartProps> = ({
  data,
  chartCard,
  chartTitle,
  chartColors,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className={chartCard}
  >
    <div className={chartTitle}>Auctions per Status</div>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill={chartColors[3]} />
      </BarChart>
    </ResponsiveContainer>
  </motion.div>
);

export default AuctionsStatusChart;
