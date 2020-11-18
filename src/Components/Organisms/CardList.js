import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Text } from 'react-native-elements';

import { Colors } from '../../styles/colors'
import Card from "../Molekules/Card"

const CardList = props => {

    return (
        <View style={styles.cardList}>
            <View style={styles.header}>
                <Text h1 h1Style={styles.title}>{props.title}</Text>
                <Card movieId={550}></Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardList: {
        backgroundColor: Colors.primaryDark
    },
    header: {
        color: "#fff",
        alignItems: "center"
    },
    title: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
    },
    paragraph: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
    }

});

export default CardList