import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExpenseType } from "../../types/expense";
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({
  expenses,
  periodName,
}: {
  expenses: ExpenseType[];
  periodName: string;
}) => {
  const expensesSum = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.periodName}>{periodName}</Text>
      <Text style={styles.expensesSum}>￦ {expensesSum.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  periodName: {
    color: GlobalStyles.colors.primary800,
  },
  expensesSum: {
    color: GlobalStyles.colors.primary800,
    fontWeight: "bold",
  },
});

export default ExpensesSummary;
