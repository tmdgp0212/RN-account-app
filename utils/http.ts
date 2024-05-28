import axios, { AxiosRequestConfig } from "axios";
import { ExpenseInputType, ExpenseType } from "../types/expense";

const getInstanse = () => {
  const config: AxiosRequestConfig = {
    baseURL: "https://rn-amountapp-default-rtdb.firebaseio.com",
  };

  const instanse = axios.create(config);

  return instanse;
};

export const storeExpense = async (expenseData: ExpenseInputType) => {
  const instanse = getInstanse();
  const res = await instanse.post("/expenses.json", expenseData);

  return res.data;
};

export const fetchExpense = async () => {
  const instanse = getInstanse();
  const res = await instanse.get("/expenses.json");

  const expenses: ExpenseType[] = [];

  for (const key in res.data) {
    const expenseObj: ExpenseType = {
      id: key,
      amount: res.data[key].amount,
      description: res.data[key].description,
      date: new Date(res.data[key].date),
    };

    expenses.push(expenseObj);
  }

  return expenses;
};
