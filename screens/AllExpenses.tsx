import React from "react";
import { View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const AllExpenses = () => {
  return <ExpensesOutput expenses={[]} expensesPeriod="총 지출 금액" />;
};

export default AllExpenses;
