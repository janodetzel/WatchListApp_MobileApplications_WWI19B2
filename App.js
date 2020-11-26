import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, text } from "react-native";

import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";

import { useStore } from "./src/Utils/Zustand";
import shallow from "zustand/shallow";
import { enableMapSet } from "immer";

import * as Localization from "expo-localization";
import i18n from "i18n-js";

import Home from "./src/Components/Views/Home";
import { Colors } from "./src/styles/colors";
import Login from "./src/Components/Views/Login";

import {
  useFonts,
  DMMono_300Light,
  DMMono_400Regular,
  DMMono_500Medium,
} from "@expo-google-fonts/dm-mono";

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP
  );
}

export default function App() {
  enableMapSet();
  changeScreenOrientation();
  i18n.locale = Localization.locale;

  let [fontsLoaded] = useFonts({
    DMMono_500Medium,
  });

  const { userKey, addUser, deleteUser, logIn, logOut, store } = useStore(
    (store) => ({
      userKey: store.currUserKey,
      addUser: store.addUser,
      deleteUser: store.deleteUser,
      logIn: store.logIn,
      logOut: store.logOut,
      store: store,
    }),
    shallow
  );

  const onLogIn = (cred) => {
    console.log(i18n.locale);
    addUser(cred);
    logIn(cred);
  };

  const onLogOut = () => {
    logOut();
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.app}>
        <StatusBar style="auto" />

        {userKey ? (
          <Home userKey={userKey} logOut={onLogOut} />
        ) : (
          <Login
            logIn={(cred) => onLogIn(cred)}
            deleteUser={(userName) => deleteUser(userName)}
          ></Login>
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
