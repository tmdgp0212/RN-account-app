import React from "react";
import { View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { ExpenseType } from "../../types/expense";

const DUMMY_EXPENSES: ExpenseType[] = [
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
    date: new Date("2024-05-20"),
  },
];

const ExpensesOutput = ({
  expenses,
  expensesPeriod,
}: {
  expenses: ExpenseType[];
  expensesPeriod: string;
}) => {
  return (
    <>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </>
  );
};

export default ExpensesOutput;
