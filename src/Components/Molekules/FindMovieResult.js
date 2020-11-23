import React from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableWithoutFeedback } from "react-native";

import { Text, Image } from 'react-native-elements';
import ReadMore from '@fawazahmed/react-native-read-more';
import Moment from 'moment';


import { posterSrcSm } from '../../Utils/theMovieDB'
import { Colors } from '../../styles/colors'

const FindMoiveResult = props => {

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.findMoiveResult}>
                <View style={styles.posterWrapper}>
                    <Image source={{ uri: posterSrcSm + props.posterPath }} style={styles.poster}
                        PlaceholderContent={<ActivityIndicator />}
                    ></Image>
                </View>
                <View style={styles.contentWrapper}>

                    <View style={styles.titleBar}>
                        <Text h4 style={[styles.title, styles.font]}>{props.title}</Text>
                        <Text style={[styles.date, styles.font]}>{Moment(props.releaseDate).format('YYYY')}</Text>
                    </View>
                    <Text style={[styles.font, styles.tagline]}>{props.tagline}</Text>


                    <ReadMore
                        wrapperStyle={[styles.overview, styles.font]}
                        numberOfLines={2}
                        seeMoreText={"Read more ▼"}
                        seeLessText={"Read less ▲"}
                        seeLessStyle={{ color: Colors.pink }}
                        seeMoreStyle={{ color: Colors.green }}
                        backgroundColor={Colors.primaryDark}
                        style={styles.font}>{props.overview}
                    </ReadMore>
                </View>
            </View>

        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
    },
    findMoiveResult: {
        flexDirection: "row",
        flex: 1,
        marginBottom: 32,
    },
    posterWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    poster: {
        width: 53,
        height: 75,
        borderRadius: 8,

    },
    contentWrapper: {
        flexDirection: "column",
        flex: 4,
    },
    titleBar: {
        flexDirection: "row",
        flexWrap: "wrap",

        flex: 1,
    },
    title: {
        flex: 4,
    },
    date: {
        flex: 1,
        alignSelf: "auto",
        textAlign: "right"
    },
    tagline: {
        color: Colors.muted,
    },
    overview: {

    },

});

export default FindMoiveResult