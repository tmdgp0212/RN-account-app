import React from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ExpenseType } from "../../types/expense";
import { GlobalStyles } from "../../constants/styles";
import { formatDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootScreenPrarams } from "../../types/root-screen-params";

const ExpensesList = ({ expenses }: { expenses: ExpenseType[] }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootScreenPrarams>>();

  const pressCardHandler = (expenseId: string) => {
    navigation.navigate("ManageExpenses", { expenseId });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View style={styles.cartContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed && Platform.OS === "ios"
                  ? [styles.cardInnerContainer, { opacity: 0.8 }]
                  : styles.cardInnerContainer
              }
              android_ripple={{ color: GlobalStyles.colors.primary300 }}
              onPress={() => pressCardHandler(item.id)}
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
  cartContainer: {
    overflow: "hidden",
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: GlobalStyles.colors.primary200,
  },
  cardInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
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
