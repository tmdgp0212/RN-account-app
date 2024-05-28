import React, { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import IconButton from "../components/UI/IconButton";
import PrimaryButton from "../components/UI/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";

import { useExpenseActions, useExpenses } from "../store/expenseStore";
import { GlobalStyles } from "../constants/styles";
import { formatDate } from "../utils/date";

import { ExpenseFormType } from "../types/expense";
import { RootScreenPrarams } from "../types/root-screen-params";
import Input from "../components/ManageExpenses/Input";
import { storeExpense } from "../utils/http";

type ScreenProps = NativeStackScreenProps<RootScreenPrarams, "ManageExpenses">;

const ManageExpenses = ({ route, navigation }: ScreenProps) => {
  const expenseId = route.params?.expenseId;
  const isEditMode = !!expenseId;

  const expenses = useExpenses();
  const { addExpense, updateExpense, removeExpense } = useExpenseActions();

  const originExpense = expenses.find((expense) => expense.id === expenseId);

  const [expenseInput, setExpenseInput] = useState<ExpenseFormType>({
    description: "",
    amount: "0",
    date: new Date(),
  });

  const onChangeInputHandler = (name: string, value: string) => {
    if (name === "amount") {
      setExpenseInput((prev) => ({
        ...prev,
        amount: value === "" ? "0" : value.replaceAll(",", ""),
      }));
    } else {
      setExpenseInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const addExpenseHandler = () => {
    const formatedExpense = {
      description: expenseInput.description.trim(),
      amount: parseInt(expenseInput.amount),
      date: expenseInput.date,
    };

    if (formatedExpense.description.length <= 0)
      return Alert.alert("설명 형식이 올바르지 않습니다.");
    if (isNaN(formatedExpense.amount) || formatedExpense.amount < 0)
      return Alert.alert("금액 형식이 올바르지 않습니다.");
    if (new Date(formatedExpense.date).toString() === "Invalid Date") {
      return Alert.alert("날짜 형식이 올바르지 않습니다.");
    }

    if (expenseId) {
      updateExpense(expenseId, formatedExpense);
    } else {
      storeExpense(formatedExpense);
      addExpense(formatedExpense);
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
        <Input
          label={"설명"}
          id="description"
          value={expenseInput.description}
          onChangeText={(value) => onChangeInputHandler("description", value)}
        />
        <Input
          label={"금액"}
          icon="￦"
          id="amount"
          value={parseInt(expenseInput.amount).toLocaleString()}
          keyboardType="decimal-pad"
          onChangeText={(value) => onChangeInputHandler("amount", value)}
          placeholder="0"
        />
        <Input
          label="날짜"
          icon={<Ionicons name="calendar-clear" size={18} />}
          id="date"
          keyboardType="number-pad"
          placeholder="YYYY-MM-DD"
        />
        <Input
          label={"날짜"}
          id="date"
          value={formatDate(expenseInput.date)}
          maxLength={10}
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
    borderTopColor: GlobalStyles.colors.primary700,
  },
  button: {
    width: 100,
  },
});

export default ManageExpenses;
