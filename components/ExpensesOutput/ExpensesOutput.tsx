import React from "react";
import { StyleSheet, View } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import { GlobalStyles } from "../../constants/styles";
import { ExpenseType } from "../../types/expense";

const ExpensesOutput = ({
  expenses,
  expensesPeriod,
}: {
  expenses: ExpenseType[];
  expensesPeriod: string;
}) => {
  return (
    <View style={styles.screenContainer}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
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
