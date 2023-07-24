import { useState, useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import "react-native-gesture-handler";

import MainStack from "./navigate";

import { loginUserApi } from "./api/api";

// import Main from "./pages/Main";

export default function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getStorage() {
    try {
      const value = await AsyncStorage.getItem("login");
      setIsLogin(null);
      // setIsLogin(value);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async function loginHandle() {
    let checkUser = await loginUserApi({ login: email, password: password });

    if (checkUser.success) {
      await AsyncStorage.setItem("login", email);
      setIsLogin(email);
    } else {
      setIsLogin(null);
    }
  }

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLogin ? (
        <MainStack />
      ) : (
        <ImageBackground
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
              Вход в АТП
            </Text>

            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder={"Email"}
            />

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              placeholder={"Password"}
            />

            <Button
              disabled={password === "" || email === ""}
              title="Войти"
              onPress={loginHandle}
            />
          </View>
        </ImageBackground>
      )}
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
