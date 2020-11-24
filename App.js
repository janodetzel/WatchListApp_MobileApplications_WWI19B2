import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, text } from "react-native";

import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";

import { useStore } from "./src/Utils/Zustand";
import shallow from "zustand/shallow";
import { enableMapSet } from "immer";

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

  let [fontsLoaded] = useFonts({
    DMMono_500Medium,
  });

  const { userKey, addUser, logIn, logOut } = useStore(
    (store) => ({
      userKey: store.currUserKey,
      addUser: store.addUser,
      logIn: store.logIn,
      logOut: store.logOut,
    }),
    shallow
  );

  const onLogIn = cred => {
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
