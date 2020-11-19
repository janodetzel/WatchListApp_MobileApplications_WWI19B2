import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Icon } from 'react-native-elements'

import { Colors } from '../../styles/colors'

const Button = props => {

    const onPress = (e) => {

    }

    switch (props.type) {
        case "addList": {
            return (
                <Icon name="minus-circle" type="feather" color={Colors.pink} style={styles.icon} onPress={props.onPress}></Icon>

            )
        }
        case "addCard": {
            return (<Icon name="minus-circle" type="feather" color={Colors.pink} style={styles.icon} onPress={props.onPress}></Icon>
            )
        }
        case "delete": {
            return (
                <Icon name="minus-circle" type="feather" color={Colors.pink} style={styles.icon} onPress={props.onPress}></Icon>
            )
        }

        default: return (
            <Icon name="plus-circle" type="feather" color={Colors.pink} style={styles.icon} onPress={props.onPress}></Icon>
        )
    }

}

const styles = StyleSheet.create({
    button: {

    },
    icon: {
        color: Colors.pink,
        alignSelf: "center",
    }
});

export default Button;