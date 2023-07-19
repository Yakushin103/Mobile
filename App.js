import { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  // Text,
  // View,
  // ImageBackground,
  SafeAreaView,
  // Button,
  // TextInput,
} from "react-native";

import "react-native-gesture-handler";

import MainStack from "./navigate";

// import Main from "./pages/Main";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <MainStack />
      {/* <ImageBackground
        source={require("./assets/bg.jpg")}
        resizeMode="stretch"
        style={styles.image}
      >
        <View
          style={{
            width: "60%",
            paddingTop: 32,
            paddingBottom: 32,
            backgroundColor: "#ffffffe6",
            borderRadius: "5%",
          }}
        >
          <Text
            style={{ textAlign: "center", marginTop: 16, marginBottom: 16 }}
          >
            Вход в систему Ptender
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder={"Email"}
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder={"Password"}
          />

          <Button
            disabled={password === "" || email === ""}
            title="Войти"
            onPress={handleTextPress}
          />
        </View>
      </ImageBackground> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: 16,
    margin: 16,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
});
