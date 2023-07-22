import { useState } from "react";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
} from "react-native";
import { CheckBox } from "@rneui/themed";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { globalStyles } from "../style/style";

export default function RouteListModal({
  open,
  setOpen,
  reportGetMoney,
  setReportGetMoney,
}) {
  const [addNewData, setAddNewData] = useState(null);
  function handleCancel() {
    setOpen(false);
  }

  function handleConfirm() {
    setOpen(false);
  }

  function handleAdd() {
    setAddNewData({
      date_start: new Date(),
      date_end: new Date(),
      route: "",
      withCargo: false,
      distance: "",
      id: reportGetMoney.length + 1,
    });
  }

  function handleRemove() {
    setAddNewData(null);
  }

  function handleRemoveReportItem(index) {
    setReportGetMoney(reportGetMoney.filter((item, idx) => idx !== index));
  }

  function changeNewDataHandler(name, value) {
    setAddNewData({
      ...addNewData,
      [name]: value,
    });
  }

  function handleSaveNewData() {
    let updatedReport = reportGetMoney.map((item) => item);
    updatedReport.push({
      date_start: moment(addNewData.date_start).format("DD.MM.YYYY"),
      date_end: moment(addNewData.date_end).format("DD.MM.YYYY"),
      route: addNewData.route,
      withCargo: addNewData.withCargo,
      distance: addNewData.distance,
      id: addNewData.id,
    });

    setAddNewData(null);

    setReportGetMoney(updatedReport);
  }

  return (
    <Modal visible={open}>
      <SafeAreaView>
        <View style={styles.row_add}>
          {!addNewData ? (
            <TouchableOpacity onPress={handleAdd}>
              <Ionicons
                style={{ textAlign: "center" }}
                name="add-circle-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleRemove}>
              <Feather
                style={{ textAlign: "center" }}
                name="minus-circle"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          )}
        </View>

        {addNewData && (
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.route_list_column}>
                <Text> Дата погрузки </Text>
                <DateTimePicker
                  value={addNewData.date_start}
                  mode="date"
                  dateFormat="day month"
                  maximumDate={new Date()}
                  onChange={(event, date) =>
                    changeNewDataHandler("date_start", date)
                  }
                />
              </View>

              <View style={styles.route_list_column}>
                <Text> Дата разгрузки </Text>
                <DateTimePicker
                  value={addNewData.date_start}
                  mode="date"
                  dateFormat="day month"
                  maximumDate={new Date()}
                  onChange={(event, date) =>
                    changeNewDataHandler("date_end", date)
                  }
                />
              </View>
            </View>

            <View style={styles.row}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.note}
                onChangeText={(value) => changeNewDataHandler("route", value)}
                value={addNewData.route}
                placeholder={"Маршрут"}
              />
            </View>

            <View style={styles.column}>
              <Text style={globalStyles.textCenter}>Пройденное расстояние</Text>

              <View style={styles.row}>
                <TextInput
                  style={styles.textField}
                  value={addNewData.distance}
                  keyboardType="number-pad"
                  onChangeText={(value) =>
                    changeNewDataHandler(
                      "distance",
                      value.replace(/[^0-9]/g, "")
                    )
                  }
                  placeholder={"Расстояние"}
                />
                <CheckBox
                  iconType="material-community"
                  checkedIcon="checkbox-outline"
                  uncheckedIcon={"checkbox-blank-outline"}
                  checked={addNewData.withCargo}
                  onPress={() =>
                    changeNewDataHandler("withCargo", !addNewData.withCargo)
                  }
                  title="С грузом"
                />
              </View>
            </View>

            <View
              style={[
                styles.rowCenter,
                (addNewData.route === "" || addNewData.distance === "") &&
                  styles.opacity,
              ]}
            >
              <TouchableOpacity
                disabled={addNewData.route === "" || addNewData.distance === ""}
                onPress={handleSaveNewData}
              >
                <Text> Сохранить </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!!reportGetMoney.length && (
          <FlatList
            data={reportGetMoney}
            renderItem={({ item, index }) => (
              <View style={styles.row_list}>
                <View style={styles.row}>
                  <Text> {item.id} </Text>
                  <Text> Начало: {item.date_start} </Text>
                  <Text> Конец: {item.date_end} </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveReportItem(index)}
                  >
                    <Feather
                      style={{ textAlign: "center" }}
                      name="minus-circle"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <Text>
                    {" "}
                    Расстояние{item.withCargo ? " c грузом" : ""}:{" "}
                    {item.distance}{" "}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text> Маршрут: {item.route} </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        <View style={globalStyles.rowBtns}>
          <TouchableOpacity
            style={globalStyles.buttonsAction}
            onPress={handleCancel}
          >
            <Text> Закрыть </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.buttonsAction}
            onPress={handleConfirm}
          >
            <Text> Сохранить </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  route_list_column: {
    alignItems: "center",
  },
  opacity: {
    opacity: 0.5,
  },
  row_add: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  rowCenter: {
    alignItems: "center",
    marginBottom: 20,
  },
  row_list: {
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
  },
  note: {
    width: "100%",
    borderWidth: 1,
    minHeight: 50,
    borderRadius: 5,
    padding: 5,
  },
  textField: {
    width: "50%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
