import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { Colors } from "../../styles/colors";

const Button = (props) => {
  const [isPress, setIsPress] = React.useState(false);

  const buttonProps = {
    type: "feather",
    color: isPress ? Colors.green : Colors.pink,
    style: [styles.icon],
    onPress: () => {
      // setIsPress(!isPress)
      props.onPress();
    },
  };

  switch (props.type) {
    case "addList": {
      return (
        <Icon name="folder-plus" size={props.size} {...buttonProps}></Icon>
      );
    }
    case "addCard": {
      return (
        <Icon name="plus-circle" size={props.size} {...buttonProps}></Icon>
      );
    }
    case "delete": {
      return (
        <Icon name="minus-circle" size={props.size} {...buttonProps}></Icon>
      );
    }
    case "navigation": {
      return <Icon name="navigation" size={props.size} {...buttonProps}></Icon>;
    }
    default:
      return (
        <Icon name="plus-circle" size={props.size} {...buttonProps}></Icon>
      );
  }
};

const styles = StyleSheet.create({
  button: {},
  icon: {
    color: Colors.pink,
    alignSelf: "center",
  },
  pressed: {
    color: Colors.muted,
  },
});

export default Button;
