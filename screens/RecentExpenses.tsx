import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../store/expenseStore";
import { getDateMinusDays } from "../utils/date";

const RecentExpenses = () => {
  const expenses = useExpenses();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="지난 7일"
      fallbackText="지난 7일 간 지출 내역이 없습니다."
    />
  );
};

export default RecentExpenses;
