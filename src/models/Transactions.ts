export interface Transactions {
  id: number;
  title: string;
  type: "deposit" | "withdraw";
  category: string;
  amount: number;
  createdAt: string;
}
