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

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { globalStyles } from "../style/style";

export default function ExpensesMoneyReportModal({
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
      date: new Date(),
      money: 0,
      note: "",
      id: reportGetMoney.length + 1,
    });
  }

  function handleRemove() {
    setAddNewData(null);
  }

  function handleRemoveReportItem(index) {
    setReportGetMoney(reportGetMoney.filter((item, idx) => idx !== index));
  }

  function changeMoneyHandle(money) {
    setAddNewData({
      ...addNewData,
      money: +money,
    });
  }

  function changeNoteHandle(note) {
    setAddNewData({
      ...addNewData,
      note: note,
    });
  }

  function handleSaveNewData() {
    let updatedReport = reportGetMoney.map((item) => item);
    updatedReport.push({
      date: moment(addNewData.date).format("DD.MM.YYYY"),
      money: addNewData.money,
      note: addNewData.note,
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
              <DateTimePicker
                value={addNewData.date}
                mode="date"
                dateFormat="day month"
                maximumDate={new Date()}
                onChange={(event, date) => {
                  setAddNewData({
                    ...addNewData,
                    date: date,
                  });
                }}
              />

              <TextInput
                onChangeText={changeMoneyHandle}
                value={addNewData.money}
                placeholder={"Введите сумму"}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.note}
                onChangeText={changeNoteHandle}
                value={addNewData.note}
                placeholder={"Основание"}
              />
            </View>

            <View
              style={[
                styles.rowCenter,
                (addNewData.money === 0 || addNewData.note === "") &&
                  styles.opacity,
              ]}
            >
              <TouchableOpacity
                disabled={addNewData.money === 0 || addNewData.note === ""}
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
              <View
                style={[
                  styles.row_list,
                  index === 1 && globalStyles.row_bg,
                  reportGetMoney.length - 1 === index && globalStyles.row_last,
                ]}
              >
                <Text> {item.id} </Text>
                <Text> {item.date} </Text>
                <Text> {item.note} </Text>
                <Text> {item.money} </Text>
                <TouchableOpacity onPress={() => handleRemoveReportItem(index)}>
                  <Feather
                    style={{ textAlign: "center" }}
                    name="minus-circle"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
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
    // marginBottom: 20,
  },
  rowCenter: {
    alignItems: "center",
  },
  row_list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
  },
  note: {
    width: "100%",
  },
});
