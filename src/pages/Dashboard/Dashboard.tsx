import React from "react";
import { products } from "../../mocks/dashboard/products";
import { auctions } from "../../mocks/dashboard/auctions";
import { sales } from "../../mocks/dashboard/sales";
import SalesPerDayChart from "../../components/Dashboard/SalesPerDayChart/SalesPerDayChart";
import StockLevelChart from "../../components/Dashboard/StockLevelChart/StockLevelChart";
import ProductConditionsChart from "../../components/Dashboard/ProductConditionsChart/ProductConditionsChart";
import SalesRevenueChart from "../../components/Dashboard/SalesRevenueChart/SalesRevenueChart";
import AuctionsStatusChart from "../../components/Dashboard/AuctionsStatusChart/AuctionsStatusChart";

const chartCard = "bg-white rounded-xl shadow p-6 flex flex-col items-center";
const chartTitle = "text-lg font-semibold mb-4";
const chartColors = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa"];

const Dashboard: React.FC = () => {
  // Dane mockowane importowane z osobnych plików

  // --- Chart data transforms ---
  // 1. Bar chart: Number of sales per day
  const salesPerDay = Array.from(
    sales.reduce((acc, sale) => {
      acc.set(sale.sold_on, (acc.get(sale.sold_on) || 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).map(([date, count]) => ({ date, count }));

  // 2. Line chart: Stock level over time for selected product (mocked as static)
  const stockLevelData = [
    { date: "2025-06-18", stock: 60 },
    { date: "2025-06-19", stock: 55 },
    { date: "2025-06-20", stock: 53 },
    { date: "2025-06-21", stock: 50 },
    { date: "2025-06-22", stock: 48 },
  ];

  // 3. Pie chart: Product conditions distribution
  const conditionCounts = products.reduce((acc, p) => {
    acc[p.condition] = (acc[p.condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const conditionData = Object.entries(conditionCounts).map(
    ([condition, value]) => ({ name: condition, value })
  );

  // 4. Area chart: Cumulative sales revenue over time
  let cumulative = 0;
  const salesSorted = [...sales].sort((a, b) =>
    a.sold_on.localeCompare(b.sold_on)
  );
  const revenueData = salesSorted.map((sale) => {
    cumulative += sale.sale_price;
    return { date: sale.sold_on, revenue: cumulative };
  });

  // 5. Bar chart: Number of auctions per status
  const statusCounts = auctions.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const statusData = Object.entries(statusCounts).map(([status, value]) => ({
    status,
    value,
  }));

  // --- Layout ---
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <SalesPerDayChart
        data={salesPerDay}
        chartCard={chartCard}
        chartTitle={chartTitle}
        chartColors={chartColors}
      />
      <StockLevelChart
        data={stockLevelData}
        chartCard={chartCard}
        chartTitle={chartTitle}
        chartColors={chartColors}
      />
      <ProductConditionsChart
        data={conditionData}
        chartCard={chartCard}
        chartTitle={chartTitle}
        chartColors={chartColors}
      />
      <SalesRevenueChart
        data={revenueData}
        chartCard={chartCard}
        chartTitle={chartTitle}
        chartColors={chartColors}
      />
      <AuctionsStatusChart
        data={statusData}
        chartCard={chartCard}
        chartTitle={chartTitle}
        chartColors={chartColors}
      />
    </div>
  );
};

export default Dashboard;
