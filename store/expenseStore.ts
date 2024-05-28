import { create } from "zustand";
import { ExpenseInputType, ExpenseType } from "../types/expense";

interface ExpenseStoreState {
  expenses: ExpenseType[];
  actions: {
    setExpenses: (expenses: ExpenseType[]) => void;
    addExpense: (input: ExpenseInputType) => void;
    updateExpense: (id: string, input: ExpenseInputType) => void;
    removeExpense: (id: string) => void;
  };
}

const useExpenseStore = create<ExpenseStoreState>((set) => ({
  expenses: [],
  actions: {
    setExpenses: (expenses) => set({ expenses }),
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
