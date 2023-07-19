import { useState } from "react";
import MaskInput from "react-native-mask-input";

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import MoneyReportModal from "../Components/MoneyReportModal";
import ExpensesMoneyReportModal from "../Components/ExpensesMoneyReportModal";

import { globalStyles } from "../style/style";

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

const cars = ["Камаз Х 754 КК 152", "Камаз К 001 КК 152", "Камаз Х 999 ХХ 152"];

const trailers = ["ХХ 7035 52", "АА 0005 52", "КК 9999 52"];

export default function NewReport() {
  const [phone, setPhone] = useState("79888950008");
  const [selectedCar, setSelectedCar] = useState("Камаз К 001 КК 152");
  const [selectedTrailer, setSelectedTrailer] = useState("");
  const [odometer, setOdometer] = useState("");
  const [dtEnd, setDtEnd] = useState("");
  const [reportGetMoney, setReportGetMoney] = useState([]);
  const [reportExpensesMoney, setReportExpensesMoney] = useState([]);

  // modals
  const [isOpenMoneyReport, setIsOpenMoneyReport] = useState(false);
  const [isOpenExpensesMoneyReport, setIsOpenExpensesMoneyReport] =
    useState(false);

  function handleChangePhone(masked, unmasked) {
    if (unmasked[0] === "8") {
      setPhone(unmasked.replaceAt(0, "7"));
    } else {
      setPhone(unmasked);
    }
  }

  function getOdometerData() {
    let data = "";
    if (odometer === "") {
      data = "Нет данных пробега";
    } else if (+odometer < 43009) {
      data = "Не корректные данные пробега";
    } else {
      data = `${odometer - 43009}`;
    }

    return data;
  }

  function fuelConsumption() {
    let data = "";

    if (odometer === "") {
      data = "Нет данных пробега";
    } else if (dtEnd === "") {
      data = "Нет данных остатка ДТ";
    } else {
      data = "31.2";
    }

    return data;
  }

  function handleViewMoneyReport() {
    setIsOpenMoneyReport(true);
  }

  function handleViewExpensesMoneyReport() {
    setIsOpenExpensesMoneyReport(true);
  }

  function getReportMoney() {
    let data = 0;

    reportGetMoney.forEach((item) => {
      data += item.money;
    });

    return data;
  }

  function getExpensesMoney() {
    let data = 0;

    reportExpensesMoney.forEach((item) => {
      data += item.money;
    });

    return data;
  }

  return (
    <View>
      {isOpenMoneyReport && (
        <MoneyReportModal
          open={isOpenMoneyReport}
          setOpen={setIsOpenMoneyReport}
          reportGetMoney={reportGetMoney}
          setReportGetMoney={setReportGetMoney}
        />
      )}

      {isOpenExpensesMoneyReport && (
        <ExpensesMoneyReportModal
          open={isOpenExpensesMoneyReport}
          setOpen={setIsOpenExpensesMoneyReport}
          reportGetMoney={reportExpensesMoney}
          setReportGetMoney={setReportExpensesMoney}
        />
      )}

      <View style={globalStyles.row}>
        <Text style={globalStyles.rowTitle}>Водитель: </Text>
        <Text>Якушин Василий</Text>
      </View>

      <View style={[globalStyles.row, globalStyles.row_bg]}>
        <Text style={globalStyles.rowTitle}>
          {phone.length < 11 ? "*" : ""}Номер телефона :
        </Text>
        <MaskInput
          value={phone}
          onChangeText={(masked, unmasked) => {
            handleChangePhone(masked, unmasked);
          }}
          mask={[
            "+",
            /\d/,
            " ",
            "(",
            /\d/,
            /\d/,
            /\d/,
            ")",
            " ",
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
        />
      </View>

      <View style={globalStyles.row}>
        <Text style={globalStyles.rowTitle}>
          {selectedCar === "" ? "*" : ""} Автомобиль:{" "}
        </Text>
        <SelectDropdown
          data={cars}
          defaultValue={selectedCar}
          defaultButtonText="Выберите машину"
          onSelect={(selectedItem, index) => {
            setSelectedCar(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={{ height: 20, backgroundColor: "inherit" }}
          buttonTextStyle={{ fontSize: 16 }}
          rowTextStyle={{ fontSize: 16 }}
          rowStyle={{ height: 30 }}
        />
      </View>

      <View style={[globalStyles.row, globalStyles.row_bg]}>
        <Text style={globalStyles.rowTitle}>
          {selectedTrailer === "" ? "*" : ""} Прицеп:{" "}
        </Text>
        <SelectDropdown
          data={trailers}
          defaultValue={selectedTrailer}
          defaultButtonText="Выберите прицеп"
          onSelect={(selectedItem, index) => {
            setSelectedTrailer(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={{ height: 20, backgroundColor: "inherit" }}
          buttonTextStyle={{ fontSize: 16 }}
          rowTextStyle={{ fontSize: 16 }}
          rowStyle={{ height: 30 }}
        />
      </View>

      <View style={globalStyles.row}>
        <Text style={globalStyles.rowTitle}>Пробег на начало работы: </Text>
        <Text>43009</Text>
      </View>

      <View style={[globalStyles.row, globalStyles.row_bg]}>
        <Text style={globalStyles.rowTitle}>
          {odometer === "" ? "*" : ""}Пробег на конец работы:
        </Text>
        <TextInput
          onChangeText={setOdometer}
          value={odometer}
          placeholder={"Введите пробег"}
        />
      </View>

      <View style={globalStyles.row}>
        <Text style={globalStyles.rowTitle}>Общий пробег: </Text>
        <Text> {getOdometerData()} </Text>
      </View>

      <View style={[globalStyles.row, globalStyles.row_bg]}>
        <Text style={globalStyles.rowTitle}>Остаток ДТ на начало пробега:</Text>
        <Text>800</Text>
      </View>

      <View style={[globalStyles.row]}>
        <Text style={globalStyles.rowTitle}>
          {dtEnd === "" ? "*" : ""}Остаток ДТ на конец пробега:
        </Text>
        <TextInput
          onChangeText={setDtEnd}
          value={dtEnd}
          placeholder={"Остаток ДТ"}
        />
      </View>

      <View style={[globalStyles.row, globalStyles.row_bg]}>
        <Text style={globalStyles.rowTitle}>Расход топлива:</Text>
        <Text> {fuelConsumption()} </Text>
      </View>

      <View style={[globalStyles.row]}>
        <Text style={globalStyles.rowTitle}>Полученно денег:</Text>
        <Text> {getReportMoney()} </Text>
        <TouchableOpacity onPress={handleViewMoneyReport}>
          <Text> Отчет </Text>
        </TouchableOpacity>
      </View>

      <View style={[globalStyles.row, globalStyles.row_bg]}>
        <Text style={globalStyles.rowTitle}>Расход денег:</Text>
        <Text> {getExpensesMoney()} </Text>
        <TouchableOpacity onPress={handleViewExpensesMoneyReport}>
          <Text> Отчет </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
