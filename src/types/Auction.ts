export interface Auction {
  auction_id: string;
  sku: string;
  title: string;
  price: number;
  quantity: number;
  status: "draft" | "published" | "sold";
  listing_date: string;
}
