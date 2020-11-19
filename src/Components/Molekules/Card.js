import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Image } from 'react-native-elements';
import ReadMore from '@fawazahmed/react-native-read-more';
import Moment from 'moment';


import { REACT_APP_MOVIE_DB_API_TOKEN } from '@env'
import { posterSrcSm } from '../../Utils/theMovieDB'
import { Colors } from '../../styles/colors'

import Button from '../Atoms/Button';

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
                <Button type="delete"></Button>
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
                    seeLessStyle={{ color: Colors.pink }}
                    seeMoreStyle={{ color: Colors.green }}
                    backgroundColor={Colors.secondaryDark}
                    style={styles.font}>{state.overview}
                </ReadMore>

                <View style={[styles.genres]}>
                    {state.genres &&
                        state.genres.map((genre, key) => {
                            return (
                                <Text key={key} style={styles.genre}>{genre.name}</Text>
                            )
                        })
                    }
                </View>

                <View style={styles.footer}>
                    <View style={styles.genres}></View>
                    <Text style={[styles.font, { color: Colors.muted }]}>{state.created.toDateString()}</Text>
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
    deleteButton: {
        position: "absolute",
        top: 8,
        left: 8,
    },
    card: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",

        minHeight: 350,
        width: 250,
        minWidth: 200,
        margin: 0,
        padding: 16,
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
        marginBottom: 16,
    },
    poster: {
        borderRadius: 16,
        width: 105,
        height: 150,
    },
    titleBar: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
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
        marginBottom: 8,
    },
    overview: {
        marginBottom: 16,

    },
    genres: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    genre: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        textTransform: "uppercase",
        borderRadius: 16,
        borderWidth: 3,
        borderColor: Colors.white,
        color: Colors.white,
        fontWeight: "bold",
        fontSize: 6
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    }

});

export default CardList