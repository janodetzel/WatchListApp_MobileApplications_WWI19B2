import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';

import { Colors } from '../../styles/colors'
import Button from '../Atoms/Button';
import Card from "../Molekules/Card"


const CardList = props => {

    const cards = [27205, 155, 27205, 155, 670, 64688, 339403, 59440, 670, 64688, 339403, 59440]

    return (
        <View style={styles.cardList}>
            <View style={styles.header}>
                <Text h1 style={styles.title}>{props.title}</Text>
                <Button type={"delete"}></Button>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal={true}>
                    {cards.map((card, key) => {
                        return <Card key={key} movieId={card}></Card>
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

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