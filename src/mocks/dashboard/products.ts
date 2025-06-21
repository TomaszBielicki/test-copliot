import type { Product } from "../../types/Product";
import { auctions } from "./auctions";

const productsBase: Product[] = [
  {
    sku: "SKU1",
    name: "Product 1",
    brand: "BrandX",
    condition: "new",
    stock_level: 8,
  },
  {
    sku: "SKU2",
    name: "Product 2",
    brand: "BrandY",
    condition: "refurbished",
    stock_level: 3,
  },
  {
    sku: "SKU3",
    name: "Product 3",
    brand: "BrandZ",
    condition: "damaged",
    stock_level: 5,
  },
  {
    sku: "SKU4",
    name: "Product 4",
    brand: "BrandX",
    condition: "new",
    stock_level: 12,
  },
  {
    sku: "SKU5",
    name: "Product 5",
    brand: "BrandY",
    condition: "refurbished",
    stock_level: 7,
  },
  {
    sku: "SKU6",
    name: "Product 6",
    brand: "BrandZ",
    condition: "damaged",
    stock_level: 2,
  },
  {
    sku: "SKU7",
    name: "Product 7",
    brand: "BrandX",
    condition: "new",
    stock_level: 10,
  },
  {
    sku: "SKU8",
    name: "Product 8",
    brand: "BrandY",
    condition: "refurbished",
    stock_level: 6,
  },
  {
    sku: "SKU9",
    name: "Product 9",
    brand: "BrandZ",
    condition: "damaged",
    stock_level: 4,
  },
  {
    sku: "SKU10",
    name: "Product 10",
    brand: "BrandX",
    condition: "new",
    stock_level: 11,
  },
  {
    sku: "SKU11",
    name: "Product 11",
    brand: "BrandY",
    condition: "refurbished",
    stock_level: 9,
  },
  {
    sku: "SKU12",
    name: "Product 12",
    brand: "BrandZ",
    condition: "damaged",
    stock_level: 1,
  },
  {
    sku: "SKU13",
    name: "Product 13",
    brand: "BrandX",
    condition: "new",
    stock_level: 12,
  },
  {
    sku: "SKU14",
    name: "Product 14",
    brand: "BrandY",
    condition: "refurbished",
    stock_level: 5,
  },
  {
    sku: "SKU15",
    name: "Product 15",
    brand: "BrandZ",
    condition: "damaged",
    stock_level: 3,
  },
];

// Zmniejsz stock_level na podstawie sprzedanych aukcji
const products: Product[] = productsBase.map((product) => {
  const soldQty = auctions
    .filter((a) => a.status === "sold" && a.sku === product.sku)
    .reduce((sum, a) => sum + a.quantity, 0);
  return {
    ...product,
    stock_level: product.stock_level - soldQty,
  };
});

export { products };
