import React, { useState, createRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Input } from "react-native-elements";

import { Colors } from "../../styles/colors";
import Button from "../Atoms/Button";

const AddCardListInput = (props) => {
  const placeholder = "Title";
  const [input, setInput] = useState("");
  const inputRef = createRef();

  const handleSubmit = () => {
    if (input) {
      props.addCardList(input);
      resetInput();
    } else {
      inputRef.current.shake();
    }
  };

  const resetInput = () => {
    setInput("");
    inputRef.current.clear();
    props.hide();
  };

  return (
    <View>
      {props.visible && (
        <Input
          ref={inputRef}
          style={styles.input}
          inputContainerStyle={styles.container}
          selectionColor={Colors.green}
          textContentType="nickname"
          enablesReturnKeyAutomatically={true}
          placeholder={placeholder}
          value={input}
          onSubmitEditing={() => handleSubmit()}
          onChangeText={(text) => setInput(text)}
          autoFocus={true}
          onEndEditing={resetInput}
          underlineColorAndroid="transparent"
          clearTextOnFocus={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
  },
  input: {
    fontFamily: "DMMono_500Medium",
    color: Colors.white,
    alignItems: "center",
    fontSize: 32,
  },
});

export default AddCardListInput;
