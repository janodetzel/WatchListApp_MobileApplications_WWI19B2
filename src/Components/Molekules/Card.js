import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";

import { Text, Image } from "react-native-elements";
import ReadMore from "@fawazahmed/react-native-read-more";
import Moment from "moment";

import i18n from "i18n-js";

import { Colors } from "../../styles/colors";
import { REACT_APP_MOVIE_DB_API_TOKEN } from "@env";
import { posterSrcSm } from "../../Utils/theMovieDB";
import Button from "../Atoms/Button";

const CardList = (props) => {
  const [isPress, setIsPress] = React.useState(false);

  const cardProps = {
    style: props.checked
      ? [styles.card, styles.checked]
      : [styles.card, styles.unchecked],
  };

  const [state, setState] = useState({
    ...props.cardDetails,
    created: new Date(),
  });

  useEffect(() => {
    if (state.id) {
      const key = REACT_APP_MOVIE_DB_API_TOKEN;

      const dataRequest =
        "https://api.themoviedb.org/3/" +
        props.mediaType +
        props.cardDetails.id +
        "?api_key=" +
        key +
        "&language=" +
        i18n.locale;

      const fetchData = async () => {
        const data = await fetch(dataRequest).then((res) => res.json());
        console.log("FETCH", await data);
        setState({ ...state, ...data });
      };

      fetchData();

      // console.log(state);
    }
  }, []);

  if (props.new) {
    return (
      <View style={styles.card}>
        <View style={styles.emptyCard}>
          <Button type="addCard" size={40} onPress={props.addCard}></Button>
        </View>
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={props.checkCard}>
        <View {...cardProps}>
          <View style={styles.movieCard}>
            <View style={styles.posterWrapper}>
              <Image
                source={{ uri: posterSrcSm + state.poster_path }}
                style={styles.poster}
                PlaceholderContent={<ActivityIndicator />}
              ></Image>
            </View>

            <View style={styles.titleBar}>
              <Text h4 style={[styles.title, styles.font]}>
                {state.title ? state.title : state.name}
              </Text>
              <Text style={[styles.date, styles.font]}>
                {Moment(state.release_date).format("YYYY")}
              </Text>
            </View>

            <Text style={[styles.font, styles.tagline]}>{state.tagline}</Text>

            <ReadMore
              wrapperStyle={[styles.overview, styles.font]}
              numberOfLines={3}
              seeMoreText={"Read more ▼"}
              seeLessText={"Read less ▲"}
              seeLessStyle={{ color: Colors.pink }}
              seeMoreStyle={{ color: Colors.green }}
              backgroundColor={Colors.secondaryDark}
              style={styles.font}
            >
              {state.overview}
            </ReadMore>

            <View style={[styles.genres]}>
              {state.genres &&
                state.genres.slice(0, 3).map((genre, key) => {
                  return (
                    <Text key={key} style={styles.genre}>
                      {genre.name}
                    </Text>
                  );
                })}
            </View>
            <View style={styles.footer}>
              <View style={styles.genres}></View>
              <Text style={[styles.font, { color: Colors.muted }]}>
                {Moment(state.created).format("YYYY-MM-DD")}
              </Text>
            </View>
          </View>
          <View style={styles.deleteButton}>
            <Button type="delete" onPress={props.deleteCard}></Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  font: {
    fontFamily: "DMMono_500Medium",
    color: Colors.white,
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  checked: {
    borderColor: Colors.green,
    borderBottomWidth: 1,
  },
  unchecked: {
    borderColor: Colors.pink,
    borderBottomWidth: 1,
  },
  card: {
    minHeight: 350,
    width: 250,
    minWidth: 200,

    marginVertical: 50,
    marginHorizontal: 8,
    padding: 16,
    paddingBottom: 0,

    borderRadius: 16,

    backgroundColor: Colors.secondaryDark,
    shadowColor: Colors.black,
    shadowOffset: {
      width: -16,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 24,
  },
  pressed: {
    // marginRight: 0,
  },
  emptyCard: {
    justifyContent: "center",
    flex: 1,
  },
  movieCard: {
    justifyContent: "space-between",
    flexDirection: "column",
    flex: 1,
  },
  posterWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  poster: {
    flex: 1,
    borderRadius: 16,
    width: 105,
    height: 150,
  },
  titleBar: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    flex: 4,
    margin: 0,
  },
  date: {
    margin: 0,
    flex: 1,
    alignSelf: "center",
    textAlign: "right",
  },
  tagline: {
    flex: 1,
    color: Colors.muted,
    marginBottom: 8,
  },
  overview: {
    flex: 1,
    marginBottom: 16,
  },
  genres: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 8,
  },
  genre: {
    margin: 4,
    paddingHorizontal: 6,
    paddingVertical: 6,
    textTransform: "uppercase",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.white,
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 8,
  },
  checkBox: {
    position: "absolute",
    bottom: 0,
    left: -10,
  },
  footer: {
    alignItems: "center",
    marginBottom: 16,
  },
});

export default CardList;
