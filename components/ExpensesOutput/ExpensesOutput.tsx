import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import { GlobalStyles } from "../../constants/styles";
import { ExpenseType } from "../../types/expense";

const ExpensesOutput = ({
  expenses,
  expensesPeriod,
  fallbackText,
}: {
  expenses: ExpenseType[];
  expensesPeriod: string;
  fallbackText: string;
}) => {
  return (
    <View style={styles.screenContainer}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <View style={styles.noExpenses}>
          <Text style={styles.noExpensesText}>{fallbackText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  noExpenses: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noExpensesText: {
    color: GlobalStyles.colors.primary800,
  },
});

export default ExpensesOutput;
