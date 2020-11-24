import React, { useState, createRef, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

import { Text, Overlay, Input } from "react-native-elements";

import { REACT_APP_MOVIE_DB_API_TOKEN } from "@env";
import { posterSrcSm } from "../../Utils/theMovieDB";
import { Colors } from "../../styles/colors";
import Button from "../Atoms/Button";

import FindMovieResult from "../Molekules/FindMovieResult";

const FindMovieOverlay = (props) => {
  const placeholder = "Let's find a Movie";
  const [input, setInput] = useState("");
  const inputRef = createRef();

  const [results, setResults] = useState([]);

  useEffect(() => {
    const key = REACT_APP_MOVIE_DB_API_TOKEN;

    const string =
      "https://api.themoviedb.org/3/search/movie?api_key=" +
      key +
      "&language=en-US&" +
      "query=" +
      input +
      "&page=1&include_adult=false";

    if (input) {
      fetch(string)
        .then((res) => res.json())
        .then((data) => {
          try {
            var filtered = data.results.filter(
              (res) => res.poster_path != null && res.overview != ""
            );
            setResults(filtered);
          } catch (error) {
            console.log(error);
          }
        });
    }
  }, [input]);

  const onSubmit = (movieId) => {
    if (movieId) {
      props.submit(movieId);
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

  const renderResults = (results) => {
    if (results.length > 0) {
      return results.map((result, key) => {
        return (
          <FindMovieResult
            key={key}
            onPress={() => onSubmit(result.id)}
            title={result.title}
            releaseDate={result.release_date}
            overview={result.overview}
            posterPath={result.poster_path}
          >
            {" "}
          </FindMovieResult>
        );
      });
    } else if (input) {
      return <Text style={styles.noMovie}>Type in something else.</Text>;
    } else {
      return [];
    }
  };

  return (
    <Overlay
      isVisible={props.isVisible}
      onBackdropPress={props.toggleOverlay}
      fullScreen={true}
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
          // rightIcon={<Button type="navigation" onPress={() => handleSubmit()} />}
          value={input}
          // onSubmitEditing={() => handleSubmit()}
          onChangeText={(text) => setInput(text)}
          autoFocus={true}
          onEndEditing={resetInput}
          underlineColorAndroid="transparent"
          clearTextOnFocus={true}
          textAlign={"center"}
        />
        <ScrollView style={styles.resultsContainer}>
          {renderResults(results)}
        </ScrollView>
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
});

export default FindMovieOverlay;
