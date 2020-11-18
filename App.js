import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, text } from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  DMMono_300Light,
  DMMono_400Regular,
  DMMono_500Medium,
} from '@expo-google-fonts/dm-mono'

import Home from './src/Components/Views/Home';
import { Colors } from './src/styles/colors';

export default function App() {
  let [fontsLoaded] = useFonts({
    DMMono_500Medium,
  });

  const [state, setstate] = useState({ user: "Preview" })

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.app}>
        <StatusBar style="auto" />
        <Home user={state.user} logOut={() => handleLogOut()} />
      </View>
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
