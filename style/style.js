import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  mainTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  mainContainer: {
    marginTop: 20,
  },
  mainContainerTitle: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
    backgroundColor: "white",
  },
  rowBtns: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  row_bg: {
    backgroundColor: "#e2e1e1",
  },
  row_last: {
    borderBottomWidth: 1,
  },
  rowTitle: {
    fontWeight: "bold",
  },
  buttonsAction: {
    color: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
