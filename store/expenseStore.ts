import { create } from "zustand";
import { ExpenseType } from "../types/expense";

export interface ExpenseInputType {
  description: string;
  amount: number;
  date: Date;
}

interface ExpenseStoreState {
  expenses: ExpenseType[];
  actions: {
    addExpense: (input: ExpenseInputType) => void;
    updateExpense: (id: string, input: ExpenseInputType) => void;
    removeExpense: (id: string) => void;
  };
}

const useExpenseStore = create<ExpenseStoreState>((set) => ({
  expenses: [
    {
      id: "e1",
      description: "조개구이",
      amount: 34000,
      date: new Date("2024-05-20"),
    },
    {
      id: "e2",
      description: "파리바게트",
      amount: 15700,
      date: new Date("2024-5-2"),
    },
  ],
  actions: {
    addExpense: (input) =>
      set((state) => ({
        expenses: [
          {
            id: `e${new Date().getTime()}`,
            ...input,
          },
          ...state.expenses,
        ],
      })),
    updateExpense: (expenseId, input) =>
      set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense.id === expenseId ? { ...expense, ...input } : expense
        ),
      })),
    removeExpense: (expenseId) =>
      set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== expenseId),
      })),
  },
}));

export const useExpenses = () => useExpenseStore((state) => state.expenses);
export const useExpenseActions = () =>
  useExpenseStore((state) => state.actions);
