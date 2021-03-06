import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "react-native-elements";

import { useStore } from "../../Utils/Zustand";
import shallow from "zustand/shallow";

import { Colors } from "../../styles/colors";
import Button from "../Atoms/Button";
import Card from "../Molekules/Card";
import FindMovieOverlay from "../Views/FindMovieOverlay";

const CardList = (props) => {
  const [findMovieOverlay, setFindMovieOverlay] = useState(false);

  const toggleFindMovieOverlay = () => {
    setFindMovieOverlay(!findMovieOverlay);
  };

  const { addCard, checkCard, deleteCard } = useStore(
    (store) => ({
      addCard: store.addCard,
      checkCard: store.checkCard,
      deleteCard: store.deleteCard,
    }),
    shallow
  );

  const onAddCard = (cardDetails) => {
    addCard(cardDetails, props.cardListKey);
  };

  const onCheckCard = (checked, cardKey) => {
    checkCard(!checked, cardKey, props.cardListKey);
  };

  const onDeleteCard = (cardKey) => {
    deleteCard(cardKey, props.cardListKey);
  };

  return (
    <View style={styles.cardList}>
      <View style={styles.header}>
        <Text h1 style={styles.title}>
          {props.title}
        </Text>
        <Button type={"delete"} onPress={() => props.deleteList()}></Button>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>

          {Object.entries(props.cards).map(([key, card]) => {
            return (
              <Card
                key={key}
                cardDetails={card.details}
                created={card.created}
                checked={card.checked}
                mediaType={card.details.media_type || "movie"}
                checkCard={() => onCheckCard(card.checked, key)}
                deleteCard={() => onDeleteCard(key)}
                new={false}
              ></Card>
            );
          })}
          <Card new={true} addCard={() => toggleFindMovieOverlay()}></Card>
        </ScrollView>
      </View>
      <FindMovieOverlay
        submit={(props) => onAddCard(props)}
        isVisible={findMovieOverlay}
        toggleOverlay={toggleFindMovieOverlay}
      ></FindMovieOverlay>
    </View>
  );
};

const styles = StyleSheet.create({
  cardList: {
    backgroundColor: Colors.primaryDark,
    marginBottom: 32,
  },
  header: {
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  title: {
    fontFamily: "DMMono_500Medium",
    color: Colors.white,
  },
  paragraph: {
    fontFamily: "DMMono_500Medium",
    color: Colors.white,
  },
  scrollContainer: {
    flex: 1,
  },
});

export default CardList;
