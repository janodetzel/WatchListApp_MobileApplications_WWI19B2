import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Input, Text } from "react-native-elements";

import { useStore } from "../../Utils/Zustand";
import shallow from 'zustand/shallow'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import { Colors } from "../../styles/colors";
import CardList from "../Organisms/CardList";
import Button from "../Atoms/Button";
import AddCardListInput from "../Molekules/AddCardListInput";

const Home = (props) => {

  const [addCardListInput, setAddCardListInput] = useState(false);

  const toggleCardListInput = () => {
    setAddCardListInput(!addCardListInput)
  }

  const { store, user, cardLists, addCardList, deleteCardList } = useStore(
    (store) => ({
      store: store,
      user: store.users.get(props.userKey),
      cardLists: store.users.get(props.userKey).cardLists,
      addCardList: store.addCardList,
      deleteCardList: store.deleteCardList
    }), shallow
  );

  useEffect(() => {
    console.log("HOME USER KEY", props.userKey)
    console.log("HOME USER OBJECT", store.users)
    console.log("CARDLISTS", cardLists)
  }, [cardLists])


  const onDeleteCardList = cardListKey => {
    console.log("ON DELETE CARD LIST", cardListKey)
    deleteCardList(cardListKey)
  };

  const onAddCardList = cardListTitle => {
    addCardList(cardListTitle)
  };

  return (
    <KeyboardAwareScrollView style={styles.home} automaticallyAdjustContentInsets={true} enableOnAndroid={true}>
      <View style={styles.titleContainer}>
        <Text h1 h1Style={styles.greeting}>
          Hi, {user.name === "Preview" ? "There" : user.name}!
        </Text>
        <Text h4 h4Style={styles.paragraph}>
          Create your own MovieLibrary
        </Text>
      </View>
      <View style={styles.cardListContainer}>
        {[...cardLists].map(([key, value]) => (
          <CardList
            key={key}
            user={user.name}
            cardListKey={key}
            title={value.title}
            deleteList={() => onDeleteCardList(key)}
          ></CardList>
        ))}

      </View>
      <AddCardListInput visible={addCardListInput} hide={() => setAddCardListInput(false)} addCardList={(props) => onAddCardList(props)}></AddCardListInput>
      <Button
        size={40}
        type={"addList"}
        onPress={() => toggleCardListInput()}
      ></Button>

      <View style={styles.footer}>
        <Text style={styles.creator}>Created By Jano Detzel</Text>
        <Text style={styles.logout} onPress={() => props.logOut()}>
          Log Out
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: Colors.primaryDark,
  },
  titleContainer: {
    color: "#fff",
    alignItems: "center",
    margin: 32,
  },
  greeting: {
    fontFamily: "DMMono_500Medium",
    color: Colors.white,
  },
  paragraph: {
    fontFamily: "DMMono_500Medium",
    color: Colors.white,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
  },

  creator: {
    color: Colors.white,
  },
  logout: {
    color: Colors.blue,
  },
});

export default Home;
