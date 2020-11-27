import React, { useState, createRef, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, ActivityIndicator, View } from "react-native";

import i18n from "i18n-js";

import { Text, Overlay, Input } from "react-native-elements";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { v4 as uuidv4 } from "uuid";


import { REACT_APP_MOVIE_DB_API_TOKEN } from "@env";
import { Colors } from "../../styles/colors";

import FindMovieResult from "../Molekules/FindMovieResult";
import Button from "../Atoms/Button";

const FindMovieOverlay = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  const placeholder = "Let's find a Movie";
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const inputRef = createRef();

  const [results, setResults] = useState([]);

  const key = REACT_APP_MOVIE_DB_API_TOKEN;
  const requestString = `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=${i18n.locale}&query=${input}&page=${page}&include_adult=true`

  useEffect(() => {
    if (input) {
      trackPromise(
        fetchData().then((data) => {
          try {
            var filtered = data.results.filter(
              (res) => res.poster_path != null && res.overview != ""
            );
            setResults(filtered);
          } catch (error) {
            console.log(error);
          }
        }
        )
      );
    }
  }, [input]);

  const fetchData = async () => {
    const data = await fetch(requestString).then((res) => res.json());
    return await data;
  };

  const onSubmit = (cardDetails) => {
    if (cardDetails) {
      props.submit(cardDetails);
      props.toggleOverlay();
      resetInput();
    } else {
      props.toggleOverlay();
    }
  };

  const resetInput = () => {
    setInput("");
    inputRef.current.clear();
  };

  const renderResult = ({ item }) => {
    return (
      <FindMovieResult
        onPress={() => onSubmit(item)}
        title={item.title ? item.title : item.name}
        releaseDate={item.release_date}
        overview={item.overview}
        posterPath={item.poster_path}
      ></FindMovieResult>
    )
  };

  const renderResults = () => {
    if (results.length > 0 || input == []) {
      return (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            renderItem={renderResult}
            keyExtractor={() => uuidv4()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )
    } else {
      return (
        <Text style={styles.noMovie}>No luck.</Text>
      )
    }
  }

  return (

    <Overlay
      isVisible={props.isVisible}
      fullScreen={true}
      animationType="slide"
      overlayStyle={styles.overlay}
    >
      <SafeAreaView style={styles.overlayContent}>
        <Input
          ref={inputRef}
          style={styles.input}
          inputContainerStyle={styles.inputContainer}
          selectionColor={Colors.green}
          textContentType="nickname"
          enablesReturnKeyAutomatically={true}
          placeholder={placeholder}
          value={input}
          onChangeText={(text) => setInput(text)}
          autoFocus={true}
          underlineColorAndroid="transparent"
          textAlign={"left"}
          rightIcon={<Button type="close" onPress={props.toggleOverlay}></Button>}
        />
        {
          promiseInProgress ? <ActivityIndicator /> : renderResults()
        }
      </SafeAreaView>
    </Overlay>

  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: Colors.primaryDark,
  },
  overlayContent: {
    marginVertical: 64,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  input: {
    fontFamily: "DMMono_500Medium",
    color: Colors.white,
    alignItems: "center",
    fontSize: 20,
  },
  resultsContainer: {
    marginHorizontal: 8,
  },
  noMovie: {
    fontFamily: "DMMono_500Medium",
    alignSelf: "center",
    color: Colors.white,
  },
  closeButton: {
    position: "absolute",
    top: 64,
    right: 32
  }
});

export default FindMovieOverlay;
