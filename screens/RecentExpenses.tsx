import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const RecentExpenses = () => {
  return <ExpensesOutput expenses={[]} expensesPeriod="지난 7일 간" />;
};

export default RecentExpenses;
