import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpenses";

import IconButton from "./components/UI/IconButton";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "./constants/styles";
import { RootScreenPrarams } from "./types/root-screen-params";
import { useEffect } from "react";
import { fetchExpense } from "./utils/http";
import { useExpenseActions } from "./store/expenseStore";

const Stack = createNativeStackNavigator<RootScreenPrarams>();
const BottomTabs = createBottomTabNavigator<RootScreenPrarams>();

const BottomTabNavigation = () => {
  // const { setExpenses } = useExpenseActions();

  // useEffect(() => {
  //   const getExpenses = async () => {
  //     const expenses = await fetchExpense();
  //     setExpenses(expenses);
  //   };

  //   getExpenses();
  // }, []);
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "#fff",
        headerRight: ({ tintColor }) => (
          <IconButton
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          >
            <Ionicons name="add" color={tintColor} size={24} />
          </IconButton>
        ),
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.primary200,
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass-outline" color={color} size={size - 2} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size - 2} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: "#fff",
            contentStyle: { backgroundColor: GlobalStyles.colors.primary50 },
          }}
        >
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabNavigation}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ManageExpenses"
            component={ManageExpenses}
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
