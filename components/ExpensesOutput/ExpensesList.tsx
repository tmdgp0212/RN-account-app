import React from "react";
import { FlatList, Text, View } from "react-native";
import { ExpenseType } from "../../types/expense";

const ExpensesList = ({ expenses }: { expenses: ExpenseType[] }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View>
            <Text>{item.description}</Text>
            <Text>￦ {item.amount.toLocaleString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpensesList;
