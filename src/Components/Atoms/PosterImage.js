import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    stretch: {
        width: 50,
        height: 200,
        resizeMode: 'stretch',
    },
});

const PosterImage = (path) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.stretch}
                source={require('@expo/snack-static/react-native-logo.png')}
            />
        </View>
    );
}

export default PosterImage