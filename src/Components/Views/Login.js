import React, { useState, createRef } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input } from "react-native-elements";

import { useStore } from "../../Utils/Zustand";
import shallow from "zustand/shallow";

import githubUsernameRegex from "github-username-regex";

import { Colors } from "../../styles/colors";
import Button from "../Atoms/Button";

const Login = (props) => {
  const placeholder = "Yo, what's your name?";
  const [input, setInput] = useState("");
  const inputRef = createRef();

  const { users } = useStore(
    (store) => ({
      users: store.users,
    }),
    shallow
  );

  const [userToDelete, setUserToDelete] = useState();

  const onSubmit = () => {
    if (input && validInput) {
      props.logIn(input);
    } else {
      inputRef.current.shake();
      resetInput();
    }
  };

  const onDeleteUser = (userName) => {
    props.deleteUser(userName);
    toggleDeleteText();
  };

  const validInput = githubUsernameRegex.test(input);

  const resetInput = () => {
    inputRef.current.clear();
  };

  const toggleDeleteText = (userName) => {
    if (userToDelete) {
      setUserToDelete();
    } else {
      setUserToDelete(userName);
    }
  };

  const renderDeleteText = () => {
    if (userToDelete) {
      return (
        <Text style={styles.delete} onPress={() => onDeleteUser(userToDelete)}>
          Press here to erase {userToDelete}
        </Text>
      );
    }
  };

  return (
    <View style={styles.login}>
      <Input
        ref={inputRef}
        style={styles.input}
        selectionColor={Colors.green}
        rightIcon={<Button type="navigation" onPress={() => onSubmit()} />}
        textContentType="nickname"
        enablesReturnKeyAutomatically={false}
        placeholder={placeholder}
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={() => onSubmit()}
      // onEndEditing={resetInput}
      />

      <View style={styles.recents}>
        <Text h4 style={styles.recentsTitle}>
          Recents
        </Text>

        <View style={styles.wrapper}>
          {Object.entries(users)
            .sort(([aKey, aValue], [bKey, bValue]) =>
              aValue.timestamp > bValue.timestamp
                ? -1
                : bValue.timestamp > aValue.timestamp
                  ? 1
                  : 0
            )
            .slice(0, 9)
            .map(([key, user]) => {
              return (
                <Text
                  style={styles.recent}
                  key={key}
                  onPress={() => props.logIn(user.name)}
                  onLongPress={() => toggleDeleteText(user.name)}
                >
                  {user.name}
                </Text>
              );
            })}
        </View>

        {renderDeleteText()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    backgroundColor: Colors.primaryDark,
    width: "100%",
    paddingHorizontal: 32,
  },
  input: {
    fontFamily: "DMMono_500Medium",
    color: Colors.white,
    alignItems: "center",
  },
  recents: {
    marginTop: 32,
    padding: 8,
    alignItems: "center",
  },
  recentsTitle: {
    fontFamily: "DMMono_500Medium",
    color: Colors.white,
    marginBottom: 16,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  recent: {
    fontFamily: "DMMono_500Medium",
    color: Colors.blue,
    margin: 8,
  },
  delete: {
    flex: 1,
    position: "absolute",
    fontFamily: "DMMono_500Medium",
    color: Colors.pink,
    bottom: -100,
  },
});

export default Login;