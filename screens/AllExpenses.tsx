import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../store/expenseStore";

const AllExpenses = () => {
  const expenses = useExpenses();
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="총 지출 금액"
      fallbackText="지출 내역이 없습니다."
    />
  );
};

export default AllExpenses;
