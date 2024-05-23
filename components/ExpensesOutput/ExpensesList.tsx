import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ExpenseType } from "../../types/expense";
import { GlobalStyles } from "../../constants/styles";
import { formatDate } from "../../utils/formatDate";

const ExpensesList = ({ expenses }: { expenses: ExpenseType[] }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.cardContainer}
              android_ripple={{ color: GlobalStyles.colors.primary100 }}
            >
              <View style={styles.summaryContainer}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{formatDate(item.date)}</Text>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>
                  ￦ {item.amount.toLocaleString()}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary200,
    marginVertical: 4,
  },
  summaryContainer: {
    flex: 1,
  },
  amountContainer: {},
  description: {
    color: GlobalStyles.colors.primary800,
    fontWeight: "bold",
  },
  date: {
    color: GlobalStyles.colors.primary700,
  },
  amount: {
    color: GlobalStyles.colors.primary800,
    fontWeight: "bold",
  },
});

export default ExpensesList;
