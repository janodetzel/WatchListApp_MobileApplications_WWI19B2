import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, text } from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  DMMono_300Light,
  DMMono_400Regular,
  DMMono_500Medium,
} from '@expo-google-fonts/dm-mono'

import Home from './src/Components/Views/Home';
import { Colors } from './src/styles/colors';
import Login from './src/Components/Views/Login';

export default function App() {
  let [fontsLoaded] = useFonts({
    DMMono_500Medium,
  });

  const [state, setstate] = useState({ user: "Preview" })

  const [lin, setLin] = useState(false)

  const onLogIn = cred => {
    setLin(true)
    setstate({ user: cred })
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.app}>
        <StatusBar style="auto" />

        {lin ? <Home user={state.user} logOut={() => handleLogOut()} />
          : <Login logIn={cred => onLogIn(cred)}></Login>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
