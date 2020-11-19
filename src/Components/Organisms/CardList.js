import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';

import { Colors } from '../../styles/colors'
import Button from '../Atoms/Button';
import Card from "../Molekules/Card"


const CardList = props => {

    return (
        <View style={styles.cardList}>
            <View style={styles.header}>
                <Text h1 style={styles.title}>{props.title}</Text>
                <Button type={"delete"}></Button>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal={true}>
                    <Card movieId={550}></Card>
                    <Card movieId={123}></Card>
                    <Card movieId={550}></Card>
                    <Card movieId={550}></Card>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardList: {
        backgroundColor: Colors.primaryDark,
    },
    header: {
        color: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 8
    },
    title: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
    },
    paragraph: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
    },
    scrollContainer: {
        flex: 1
    }

});

export default CardList