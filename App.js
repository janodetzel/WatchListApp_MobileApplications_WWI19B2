import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, text } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { AppLoading } from "expo";
import {
  useFonts,
  DMMono_300Light,
  DMMono_400Regular,
  DMMono_500Medium,
} from "@expo-google-fonts/dm-mono";

import Home from "./src/Components/Views/Home";
import { Colors } from "./src/styles/colors";
import Login from "./src/Components/Views/Login";

import { useStore } from "./src/Utils/Zustand";
import shallow from "zustand/shallow";

import { enableMapSet } from "immer";

export default function App() {
  enableMapSet();

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  }

  changeScreenOrientation();

  let [fontsLoaded] = useFonts({
    DMMono_500Medium,
  });

  const { userKey, addUser, logIn, logOut, store } = useStore(
    (store) => ({
      userKey: store.currUserKey,
      addUser: store.addUser,
      logIn: store.logIn,
      logOut: store.logOut,
      store: store,
    }),
    shallow
  );

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    console.log("CURRENT STORAGE", store);
  }, []);

  const onLogIn = (cred) => {
    addUser(cred);
    logIn(cred);
    setAuth(true);
  };

  const onLogOut = () => {
    logOut();
    setAuth(false);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.app}>
        <StatusBar style="auto" />
        {userKey ? (
          <Home userKey={userKey} logOut={() => onLogOut()} />
        ) : (
          <Login logIn={(cred) => onLogIn(cred)}></Login>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    color: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
