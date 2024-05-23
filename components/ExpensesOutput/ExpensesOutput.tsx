import React from "react";
import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { ExpenseType } from "../../types/expense";
import { GlobalStyles } from "../../constants/styles";

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
    date: new Date("2024-5-2"),
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
    <View style={styles.screenContainer}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary50,
  },
});

export default ExpensesOutput;
