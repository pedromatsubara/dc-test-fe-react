export type MethodType = "CREDIT" | "DEBIT" | "ONLINE";
export interface Payment {
  _id: string;
  method: keyof MethodType;
  amount: number;
}
