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
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  periodName: {
    color: GlobalStyles.colors.primary50,
  },
  expensesSum: {
    color: GlobalStyles.colors.primary50,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ExpensesSummary;
