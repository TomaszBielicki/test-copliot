export interface Order {
  order_id: string;
  supplier: string;
  sku: string;
  quantity: number;
  expected_date: string;
  purchase_price: number;
}
