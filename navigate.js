import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import NewReport from "./pages/NewReport";
import ListOfReports from "./pages/ListOfReports";
import Main from "./pages/Main";

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: "Главная", headerStyle: { opacity: 0 } }}
        />
        <Stack.Screen
          name="NewReport"
          component={NewReport}
          options={{ title: "Новый отчет" }}
        />
        <Stack.Screen
          name="ListOfReports"
          component={ListOfReports}
          options={{ title: "Предыдущие отчеты" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
