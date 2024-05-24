import React, { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import IconButton from "../components/UI/IconButton";
import PrimaryButton from "../components/UI/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";

import { useExpenseActions, useExpenses } from "../store/expenseStore";
import { GlobalStyles } from "../constants/styles";
import { formatDate } from "../utils/date";

import { ExpenseInputType } from "../types/expense";
import { RootScreenPrarams } from "../types/root-screen-params";

type ScreenProps = NativeStackScreenProps<RootScreenPrarams, "ManageExpenses">;

const ManageExpenses = ({ route, navigation }: ScreenProps) => {
  const expenseId = route.params?.expenseId;
  const isEditMode = !!expenseId;

  const expenses = useExpenses();
  const { addExpense, updateExpense, removeExpense } = useExpenseActions();

  const originExpense = expenses.find((expense) => expense.id === expenseId);

  const [expenseInput, setExpenseInput] = useState<ExpenseInputType>({
    description: "",
    amount: "0",
    date: new Date(),
  });

  const onChangeInputHandler = (name: string, value: string) => {
    if (name === "amount") {
      setExpenseInput((prev) => ({
        ...prev,
        amount: value.replaceAll(",", ""),
      }));
    } else {
      setExpenseInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const addExpenseHandler = () => {
    if (isNaN(Number(expenseInput.amount)))
      return Alert.alert("금액 형식이 올바르지 않습니다.");

    const farmatedExpense = {
      ...expenseInput,
      amount: parseInt(expenseInput.amount),
    };

    if (expenseId) {
      updateExpense(expenseId, farmatedExpense);
    } else {
      addExpense(farmatedExpense);
    }

    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    if (!expenseId) return;

    removeExpense(expenseId);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit Expense" : "Add Expense",
    });

    if (isEditMode && originExpense) {
      setExpenseInput({
        description: originExpense.description,
        amount: `${originExpense.amount}`,
        date: originExpense.date,
      });
    }
  }, [navigation, isEditMode]);
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>설명</Text>
        <TextInput
          style={styles.textInput}
          id="description"
          value={expenseInput.description}
          onChangeText={(value) => onChangeInputHandler("description", value)}
        />
        <Text style={styles.label}>금액</Text>
        <TextInput
          style={styles.textInput}
          id="amount"
          value={parseInt(expenseInput.amount).toLocaleString()}
          keyboardType="number-pad"
          onChangeText={(value) => onChangeInputHandler("amount", value)}
          placeholder="0"
        />
        <Text style={styles.label}>날짜</Text>
        <TextInput
          style={styles.textInput}
          id="date"
          value={formatDate(expenseInput.date)}
        />
        <View style={styles.buttonsContainer}>
          <PrimaryButton
            onPress={cancelHandler}
            variation="flat"
            style={{ button: styles.button }}
          >
            취소
          </PrimaryButton>
          <PrimaryButton
            onPress={addExpenseHandler}
            style={{ button: styles.button }}
          >
            {isEditMode ? "수정" : "추가"}
          </PrimaryButton>
        </View>
      </View>
      {isEditMode && (
        <View style={styles.deleteContainer}>
          <IconButton onPress={deleteExpenseHandler}>
            <Ionicons
              name="trash"
              size={24}
              color={GlobalStyles.colors.error500}
            />
          </IconButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
  formContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
  },
  deleteContainer: {
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary800,
  },
  button: {
    width: 100,
  },
  label: {
    marginTop: 8,
  },
  textInput: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});

export default ManageExpenses;
