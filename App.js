import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, SafeAreaView, text } from "react-native";
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
import { enableMapSet } from "immer";

import { storeData, getData } from "./src/Utils/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function App() {
  enableMapSet();

  let [fontsLoaded] = useFonts({
    DMMono_500Medium,
  });

  const { store, currUser, getUserByName, logIn, logOut, clean } = useStore(
    (store) => ({
      store: store,
      currUser: store.currUser,
      getUserByName: store.getUserByName,
      logIn: store.logIn,
      logOut: store.logOut,
      clean: store.clean,
    })
  );

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(currUser);
  }, [currUser]);

  const onLogIn = (cred) => {
    // clean();
    // AsyncStorage.clear()
    console.log("STORE", store);
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
        {user.key ? (
          <Home user={user.name} logOut={() => onLogOut()} />
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
