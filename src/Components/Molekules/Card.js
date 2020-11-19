import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Image } from 'react-native-elements';
import ReadMore from '@fawazahmed/react-native-read-more';
import Moment from 'moment';


import { REACT_APP_MOVIE_DB_API_TOKEN } from '@env'
import { posterSrcSm } from '../../Utils/theMovieDB'
import { Colors } from '../../styles/colors'

const CardList = props => {

    const [state, setState] = useState({
        created: new Date(),
    })

    useEffect(() => {
        const key = REACT_APP_MOVIE_DB_API_TOKEN
        const string = "https://api.themoviedb.org/3/movie/" + props.movieId + "?api_key=" + key

        const fetchData = async () => {
            const result = await fetch(string).then(res => res.json())
            setState({ ...state, ...result })
        }

        fetchData()


        console.log("STATE", state)
        console.log("POSTER PATH", posterSrcSm + state.poster_path)
    }, [])


    return (
        <View style={styles.card}>
            <View style={styles.deleteButton}>
            </View>
            <View style={styles.cardWrapper}>
                <View style={styles.posterWrapper}>
                    <Image source={{ uri: posterSrcSm + state.poster_path }} style={styles.poster}
                        PlaceholderContent={<ActivityIndicator />}
                    ></Image>
                </View>

                <View style={styles.titleBar}>
                    <Text h4 style={[styles.title, styles.font]}>{state.title}</Text>
                    <Text style={[styles.date, styles.font]}>{Moment(state.release_date).format('YYYY')}</Text>
                </View>

                <Text style={[styles.font, styles.tagline]}>{state.tagline}</Text>
                <ReadMore
                    wrapperStyle={[styles.overview, styles.font]}
                    numberOfLines={2}
                    seeMoreText={"Read more ▼"}
                    seeLessText={"Read less ▲"}
                    seeLessStyle={{ color: Colors.green }}
                    seeMoreStyle={{ color: Colors.green }}
                    style={styles.font}> {state.overview}
                </ReadMore>
                <View style={styles.footer}>
                    <View style={styles.genres}></View>
                    <Text style={[styles.font]}>{state.created.toDateString()}</Text>
                </View>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    font: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
    },
    card: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",

        minHeight: 350,
        width: 250,
        minWidth: 200,
        margin: 0,
        padding: 24,
        paddingBottom: 0,
        borderRadius: 16,
        overflow: "visible",

        backgroundColor: Colors.secondaryDark,
        shadowColor: Colors.black,
        shadowOffset: {
            width: -16,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 24,
    },
    posterWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 16,
    },
    poster: {
        borderRadius: 16,
        width: 105,
        height: 150,
    },
    titleBar: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        flex: 2,
        margin: 0
    },
    date: {
        margin: 0,
        flex: 1,
        alignSelf: "center",
    },
    tagline: {
        color: Colors.muted,
    }

});

export default CardList