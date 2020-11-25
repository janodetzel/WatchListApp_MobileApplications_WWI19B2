import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

import { useStore } from "../../Utils/Zustand";
import shallow from 'zustand/shallow'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Colors } from "../../styles/colors";
import CardList from "../Organisms/CardList";
import Button from "../Atoms/Button";
import AddCardListInput from "../Molekules/AddCardListInput";

const Home = (props) => {
  const [addCardListInput, setAddCardListInput] = useState(false);

  const { user, cardLists, addCardList, deleteCardList } = useStore(
    (store) => ({
      user: store.users[props.userKey],
      cardLists: store.users[props.userKey].cardLists,
      addCardList: store.addCardList,
      deleteCardList: store.deleteCardList
    }), shallow
  );

  const toggleCardListInput = () => {
    setAddCardListInput(!addCardListInput)
  }

  const onAddCardList = cardListTitle => {
    addCardList(cardListTitle)
  };

  const onDeleteCardList = cardListKey => {
    deleteCardList(cardListKey)
  };

  return (
    <KeyboardAwareScrollView style={styles.home} automaticallyAdjustContentInsets={true} enableOnAndroid={true}>

      <View style={styles.titleContainer}>
        <Text h1 h1Style={styles.greeting}>
          Hi, {user.name === "Preview" ? "There" : user.name}!
        </Text>
        <Text h4 h4Style={styles.paragraph}>
          Create your WatchList
        </Text>
      </View>

      <View style={styles.cardListContainer}>
        {Object.entries(cardLists).map(([key, value]) => (
          <CardList
            key={key}
            cardListKey={key}
            title={value.title}
            cards={value.cards}
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
    width: '100%'
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
    fontFamily: "DMMono_500Medium",
    color: Colors.muted,
  },
  logout: {
    fontFamily: "DMMono_500Medium",
    color: Colors.blue,
  },
});

export default Home;
