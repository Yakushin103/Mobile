import { useState, useEffect, useRef } from "react";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
  Image,
  Button,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { globalStyles } from "../style/style";

export default function FuelReportModal({
  open,
  setOpen,
  reportGetMoney,
  setReportGetMoney,
}) {
  let cameraRef = useRef(null);

  const [isPic, setIsPic] = useState(false);

  const [addNewData, setAddNewData] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

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
      cash_receipt: "",
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

  function handleSaveNewData() {
    let updatedReport = reportGetMoney.map((item) => item);
    updatedReport.push({
      date: moment(addNewData.date).format("DD.MM.YYYY"),
      money: addNewData.money,
      cash_receipt: addNewData.cash_receipt,
      id: addNewData.id,
    });

    setAddNewData(null);

    setReportGetMoney(updatedReport);
  }

  console.log("reportGetMoney", reportGetMoney);

  async function takePic() {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    console.log("newPhoto", newPhoto);
    setAddNewData({
      ...addNewData,
      cash_receipt: `data:image/jpg;base64,${newPhoto.base64}`,
    });
    setIsPic(false);
  }

  console.log("hasCameraPermission", hasCameraPermission);
  return (
    <Modal visible={open}>
      {isPic ? (
        <Camera style={styles.container} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Сохранить" onPress={takePic} />
          </View>
        </Camera>
      ) : (
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

                {hasCameraPermission ? (
                  <TouchableOpacity onPress={() => setIsPic(true)}>
                    <Ionicons
                      style={{ textAlign: "center" }}
                      name="add-circle-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                ) : (
                  <Text>Требуется доступ к камере</Text>
                )}

                <TextInput
                  onChangeText={changeMoneyHandle}
                  value={addNewData.money}
                  placeholder={"Введите сумму"}
                />
              </View>

              {addNewData.cash_receipt && (
                <View style={styles.row}>
                  <Image
                    style={styles.image}
                    source={{ uri: addNewData.cash_receipt }}
                  />
                </View>
              )}

              <View
                style={[
                  styles.rowCenter,
                  (addNewData.money === 0 || addNewData.cash_receipt === "") &&
                    styles.opacity,
                ]}
              >
                <TouchableOpacity
                  disabled={
                    addNewData.money === 0 || addNewData.cash_receipt === ""
                  }
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
                    <Text> {item.date} </Text>
                    <Text> {item.money} </Text>
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

                  {item.cash_receipt && (
                    <View style={styles.row}>
                      <Image
                        style={styles.image}
                        source={{ uri: item.cash_receipt }}
                      />
                    </View>
                  )}
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
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  column: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "white",
    alignSelf: "flex-end",
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
    // marginBottom: 20,
  },
  rowCenter: {
    alignItems: "center",
  },
  row_list: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
  },
  note: {
    width: "100%",
  },
  image: {
    height: 200,
    width: "100%",
  },
});
