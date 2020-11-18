import React from 'react';
import { styleSheet, View, } from 'react-native';
import { Text } from 'react-native-elements';

import { REACT_APP_MOVIE_DB_API_TOKEN } from '@env'
import { Colors } from '../../styles/colors'

const CardList = props => {

    const [state, setState] = useState({
        created: 123,
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
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{state.title}</Text>
                    <Text style={styles.date}>{state.release_date}</Text>
                </View>
                <Text style={styles.tagline}>{state.tagline}</Text>
                <View style={styles.overview}>
                    <Text>{state.overview}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.genres}></View>
                    <Text>{state.created.toDateString()}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = styleSheet.create({
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