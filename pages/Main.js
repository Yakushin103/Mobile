import React from "react";

import { View, Text } from "react-native";

import { globalStyles } from "../style/style";

export default function Main({ navigation }) {
  function addNewReport() {
    navigation.navigate("NewReport");
  }

  function viewAllReports() {
    navigation.navigate("ListOfReports");
  }

  return (
    <View>
      <Text style={globalStyles.mainTitle}>Добро пожаловать в АТП</Text>
      <View style={globalStyles.mainContainer}>
        <Text style={globalStyles.mainContainerTitle} onPress={addNewReport}>
          Создание нового отчета
        </Text>
      </View>

      <View style={globalStyles.mainContainer}>
        <Text style={globalStyles.mainContainerTitle} onPress={viewAllReports}>
          Список последних отчетов
        </Text>
      </View>
    </View>
  );
}
