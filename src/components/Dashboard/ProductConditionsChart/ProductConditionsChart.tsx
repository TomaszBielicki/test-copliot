import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface ProductConditionsChartProps {
  data: { name: string; value: number }[];
  chartCard: string;
  chartTitle: string;
  chartColors: string[];
}

const ProductConditionsChart: React.FC<ProductConditionsChartProps> = ({
  data,
  chartCard,
  chartTitle,
  chartColors,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className={chartCard}
  >
    <div className={chartTitle}>Product Conditions</div>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          label
        >
          {data.map((_, idx) => (
            <Cell
              key={`cell-${idx}`}
              fill={chartColors[idx % chartColors.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </motion.div>
);

export default ProductConditionsChart;
