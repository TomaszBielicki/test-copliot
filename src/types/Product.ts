export interface Product {
  sku: string;
  name: string;
  brand: string;
  condition: "new" | "refurbished" | "damaged";
  stock_level: number;
}
