import React, { useState } from "react";
import { products as productsMock } from "../../mocks/dashboard/products";
import { auctions as auctionsMock } from "../../mocks/dashboard/auctions";
import SalesPerDayChart from "../../components/Dashboard/SalesPerDayChart/SalesPerDayChart";
import StockLevelChart from "../../components/Dashboard/StockLevelChart/StockLevelChart";
import ProductConditionsChart from "../../components/Dashboard/ProductConditionsChart/ProductConditionsChart";
import SalesRevenueChart from "../../components/Dashboard/SalesRevenueChart/SalesRevenueChart";
import AuctionsStatusChart from "../../components/Dashboard/AuctionsStatusChart/AuctionsStatusChart";
import type { Auction } from "../../types/Auction";
import type { Product } from "../../types/Product";

const chartCard = "bg-white rounded-xl shadow p-6 flex flex-col items-center";
const chartTitle = "text-lg font-semibold mb-4";
const chartColors = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa"];

const getRandomStatus = (): "draft" | "published" | "sold" => {
  const statuses = ["draft", "published", "sold"] as const;
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomAuction = (idx: number): Auction => {
  const skus = productsMock.map((p) => p.sku);
  const sku = skus[Math.floor(Math.random() * skus.length)];
  return {
    auction_id: `A${1000 + idx}`,
    sku,
    title: `Auction ${1000 + idx}`,
    price: Math.floor(Math.random() * 200) + 50,
    quantity: Math.floor(Math.random() * 5) + 1,
    status: getRandomStatus(),
    listing_date: `2025-06-${Math.floor(Math.random() * 10) + 15}`,
  };
};

const getRandomProduct = (idx: number): Product => {
  const brands = ["BrandX", "BrandY", "BrandZ"];
  const conditions = ["new", "refurbished", "damaged"] as const;
  return {
    sku: `SKU${1000 + idx}`,
    name: `Product ${1000 + idx}`,
    brand: brands[Math.floor(Math.random() * brands.length)],
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    stock_level: Math.floor(Math.random() * 12) + 1,
  };
};

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState([...productsMock]);
  const [auctions, setAuctions] = useState([...auctionsMock]);

  // Stan widoczności wykresów
  const [showCharts, setShowCharts] = useState({
    sales: true,
    stock: true,
    conditions: true,
    revenue: true,
    auctions: true,
  });

  const handleChartToggle = (chart: keyof typeof showCharts) => {
    setShowCharts((prev) => ({ ...prev, [chart]: !prev[chart] }));
  };

  // Stan filtrowania statusów aukcji
  const allAuctionStatuses = ["draft", "published", "sold"];
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([...allAuctionStatuses]);

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // --- Chart data transforms ---
  // 1. Bar chart: Number of sales per day
  const salesFromAuctions = auctions
    .filter((a) => a.status === "sold")
    .map((a, idx) => ({
      sale_id: `S${idx + 1}`,
      auction_id: a.auction_id,
      sale_price: a.price,
      sold_on: a.listing_date,
    }));
  const salesPerDay = Array.from(
    salesFromAuctions.reduce((acc, sale) => {
      acc.set(sale.sold_on, (acc.get(sale.sold_on) || 0) + 1);
      return acc;
    }, new Map<string, number>())
  )
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // 2. Line chart: Stock level over time dla wszystkich produktów (suma stock_level)
  // Wyznaczamy daty z auctions i zakresu
  const importantDates = [
    "2025-06-18",
    "2025-06-19",
    "2025-06-20",
    "2025-06-21",
    "2025-06-22",
    "2025-06-23", // zawsze obecna na wykresie
  ];
  const dateSet = new Set([
    ...auctions.map((a) => a.listing_date),
    ...importantDates,
  ]);
  const allDates = Array.from(dateSet).sort();
  // Wylicz stock na każdą datę (dla wszystkich produktów)
  const initialStock = products.reduce((sum, p) => sum + p.stock_level, 0);
  let stock = initialStock;
  const stockLevelData = allDates.map((date) => {
    // Suma sprzedanych sztuk na dany dzień (aukcje sold)
    const soldQty = auctions
      .filter((a) => a.status === "sold" && a.listing_date === date)
      .reduce((sum, a) => sum + a.quantity, 0);
    const result = { date, stock };
    stock -= soldQty;
    return result;
  });

  // 3. Pie chart: Product conditions distribution
  const conditionCounts = products.reduce((acc, p) => {
    acc[p.condition] = (acc[p.condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const conditionData = Object.entries(conditionCounts).map(
    ([condition, value]) => ({ name: condition, value })
  );

  // 4. Area chart: Cumulative sales revenue over time + liczba sprzedanych sztuk (sumowana po dacie)
  let cumulative = 0;
  // Grupowanie po dacie: suma przychodu i suma ilości
  const soldByDate = auctions
    .filter((a) => a.status === "sold")
    .reduce((acc, a) => {
      if (!acc[a.listing_date]) {
        acc[a.listing_date] = { revenue: 0, sold_quantity: 0 };
      }
      acc[a.listing_date].revenue += a.price * a.quantity;
      acc[a.listing_date].sold_quantity += a.quantity;
      return acc;
    }, {} as Record<string, { revenue: number; sold_quantity: number }>);
  const revenueData = Object.entries(soldByDate)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, { revenue, sold_quantity }]) => {
      cumulative += revenue;
      return { date, revenue: cumulative, sold_quantity };
    });

  // Stan zakresu dat dla wykresu revenue
  const allRevenueDates = revenueData.map((d) => d.date);
  const minRevenueDate = allRevenueDates.length ? allRevenueDates[0] : "";
  const maxRevenueDate = allRevenueDates.length ? allRevenueDates[allRevenueDates.length - 1] : "";
  const [revenueDateFrom, setRevenueDateFrom] = useState(minRevenueDate);
  const [revenueDateTo, setRevenueDateTo] = useState(maxRevenueDate);

  // Dane revenue przefiltrowane po zakresie dat, zawsze pełny zakres dat
  function getDateRangeArray(start: string, end: string): string[] {
    const arr = [];
    let current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {
      arr.push(current.toISOString().slice(0, 10));
      current.setDate(current.getDate() + 1);
    }
    return arr;
  }

  const filteredRevenueData =
    revenueDateFrom && revenueDateTo
      ? getDateRangeArray(revenueDateFrom, revenueDateTo).map((date) => {
          const found = revenueData.find((d) => d.date === date);
          return (
            found || { date, revenue: 0, sold_quantity: 0 }
          );
        })
      : revenueData;

  // 5. Bar chart: Number of auctions per status (filtrowane)
  const statusCounts = auctions.reduce((acc, a) => {
    if (selectedStatuses.includes(a.status)) {
      acc[a.status] = (acc[a.status] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  const statusData = Object.entries(statusCounts).map(([status, value]) => ({
    status,
    value,
  }));

  // --- Layout ---
  return (
    <div>
      {/* Checkboxy do przełączania widoczności wykresów */}
      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showCharts.sales}
            onChange={() => handleChartToggle("sales")}
          />
          Sprzedaż dzienna
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showCharts.stock}
            onChange={() => handleChartToggle("stock")}
          />
          Poziom zapasów
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showCharts.conditions}
            onChange={() => handleChartToggle("conditions")}
          />
          Stany produktów
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showCharts.revenue}
            onChange={() => handleChartToggle("revenue")}
          />
          Przychód skumulowany
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showCharts.auctions}
            onChange={() => handleChartToggle("auctions")}
          />
          Statusy aukcji
        </label>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {showCharts.sales && (
          <SalesPerDayChart
            data={salesPerDay}
            chartCard={chartCard}
            chartTitle={chartTitle}
            chartColors={chartColors}
          />
        )}
        {showCharts.stock && (
          <StockLevelChart
            data={stockLevelData}
            chartCard={chartCard}
            chartTitle={chartTitle}
            chartColors={chartColors}
          />
        )}
        <div className="col-span-1 flex flex-col gap-4">
          <button
            className="bg-green-500 text-white rounded px-4 py-2 mb-2 hover:bg-green-600 transition"
            onClick={() => {
              const newProduct = getRandomProduct(products.length + 1);
              setProducts((prev) => [...prev, newProduct]);
            }}
          >
            Dodaj losowy produkt
          </button>
          {showCharts.conditions && (
            <ProductConditionsChart
              data={conditionData}
              chartCard={chartCard}
              chartTitle={chartTitle}
              chartColors={chartColors}
            />
          )}
        </div>
        {showCharts.revenue && (
          <div className="flex flex-col gap-2">
            {/* Zakres dat do filtrowania wykresu revenue */}
            <div className="flex gap-2 items-center mb-2">
              <label className="text-sm">Od:
                <input
                  type="date"
                  className="ml-1 border rounded px-2 py-1 text-sm"
                  min={minRevenueDate}
                  max={revenueDateTo || maxRevenueDate}
                  value={revenueDateFrom}
                  onChange={e => setRevenueDateFrom(e.target.value)}
                />
              </label>
              <label className="text-sm">Do:
                <input
                  type="date"
                  className="ml-1 border rounded px-2 py-1 text-sm"
                  min={revenueDateFrom || minRevenueDate}
                  max={maxRevenueDate}
                  value={revenueDateTo}
                  onChange={e => setRevenueDateTo(e.target.value)}
                />
              </label>
            </div>
            <SalesRevenueChart
              data={filteredRevenueData}
              chartCard={chartCard}
              chartTitle={chartTitle}
              chartColors={chartColors}
            />
          </div>
        )}
        <div className="col-span-1 flex flex-col gap-4">
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 mb-2 hover:bg-blue-600 transition"
            onClick={() => {
              const newAuction = getRandomAuction(auctions.length + 1);
              console.log("Dodano aukcję:", newAuction);
              setAuctions((prev) => [...prev, newAuction]);
            }}
          >
            Dodaj losową aukcję
          </button>
          {/* Filtrowanie statusów aukcji */}
          <div className="flex flex-wrap gap-2 mb-2">
            {allAuctionStatuses.map((status) => (
              <label key={status} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => handleStatusToggle(status)}
                />
                {status}
              </label>
            ))}
          </div>
          {showCharts.auctions && (
            <AuctionsStatusChart
              data={statusData}
              chartCard={chartCard}
              chartTitle={chartTitle}
              chartColors={chartColors}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
