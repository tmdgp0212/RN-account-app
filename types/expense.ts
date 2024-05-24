export interface ExpenseInputType {
  description: string;
  amount: string;
  date: Date;
}

export interface ExpenseType {
  id: string;
  description: string;
  amount: number;
  date: Date;
}
