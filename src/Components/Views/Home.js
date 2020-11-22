import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "react-native-elements";

import { Colors } from "../../styles/colors";
import CardList from "../Organisms/CardList";
import Button from "../Atoms/Button";

const Home = (props) => {
  const handleDeleteCardList = (props) => {
    //
  };

  const onAddCardList = () => {};

  return (
    <ScrollView style={styles.home} automaticallyAdjustContentInsets={true}>
      <View style={styles.titleContainer}>
        <Text h1 h1Style={styles.greeting}>
          Hi, {props.user === "Preview" ? "There" : props.user}!
        </Text>
        <Text h4 h4Style={styles.paragraph}>
          Create your own MovieLibrary
        </Text>
      </View>
      <View style={styles.cardListContainer}>
        <CardList
          key={1}
          user={props.user}
          title={"Action"}
          deleteList={(props) => handleDeleteCardList(props)}
        ></CardList>
      </View>
      <Button
        size={40}
        type={"addList"}
        onPress={() => onAddCardList()}
      ></Button>

      <View style={styles.footer}>
        <Text style={styles.creator}>Created By Jano Detzel</Text>
        <Text style={styles.logout} onPress={() => props.logOut()}>
          Log Out
        </Text>
      </View>
    </ScrollView>
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
    color: Colors.white,
  },
});

export default Home;
