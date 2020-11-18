import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Text } from 'react-native-elements';

import { Colors } from '../../styles/colors'
import CardList from '../Organisms/CardList';

const Home = props => {

    return (
        <View style={styles.home}>
            <View style={styles.titleContainer}>
                <Text h1 h1Style={styles.greeting} >Hi, {props.user === "Preview" ? "There" : props.user}!</Text>
                <Text h4 h4Style={styles.paragraph}>Create your own MovieLibrary</Text>
            </View>
            <View style={styles.cardListContainer}>
                <CardList user={props.user} title={"Action"} deleteList={(props) => handleDeleteCardList(props)}></CardList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: Colors.primaryDark
    },
    titleContainer: {
        color: "#fff",
        alignItems: "center"
    },
    greeting: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
    },
    paragraph: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
    }

});

export default Home