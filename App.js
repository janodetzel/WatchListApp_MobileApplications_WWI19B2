import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
import shallow from 'zustand/shallow'

import { enableMapSet } from "immer";

import { storeData, getData } from "./src/Utils/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
  enableMapSet();

  let [fontsLoaded] = useFonts({
    DMMono_500Medium,
  });

  const { store, currUser, userKey, addUser, logIn, logOut, clean } = useStore(
    (store) => ({
      store: store,
      currUser: store.currUser,
      userKey: store.currUser[0],
      addUser: store.addUser,
      logIn: store.logIn,
      logOut: store.logOut,
      clean: store.clean,
    }), shallow
  );



  const [auth, setAuth] = useState(false);

  useEffect(() => {

    // setUser(currUser);
    console.log("STORE", store)
    console.log("LOGGED IN USER", currUser)
    console.log("USERKEY", userKey)
    console.log("IS LOGGED IN", auth)
    console.log("THE USER", store.getUserByKey(userKey))
  }, [currUser]);

  const onLogIn = (cred) => {
    // clean();

    // AsyncStorage.clear()
    // console.log("STORE", store);
    // console.log("CURRENT USER", currUser)
    // console.log("GETUSERBYNAME", getUserByName(cred))

    addUser(cred)
    logIn(cred);
    // setAuth(true)
  };

  const onLogOut = () => {
    logOut();
    setAuth(false)
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.app}>
        <StatusBar style="auto" />
        {auth ? (
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
