import React, { useState, createRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input } from 'react-native-elements';
import githubUsernameRegex from 'github-username-regex';

import { useObjStore } from "../../Utils/Zustand";
import shallow from 'zustand/shallow'

import { Colors } from '../../styles/colors'
import Button from '../Atoms/Button';

const Login = props => {

    const { users } = useObjStore(
        (store) => ({
            users: store.users

        })
    );

    const placeholder = "Yo, what's your name?"
    const [input, setInput] = useState("")
    const inputRef = createRef();


    const handleSubmit = () => {
        if (input && validInput()) {
            props.logIn(input)
        } else {
            inputRef.current.shake()
        }
        resetInput()
    }

    const resetInput = () => {
        inputRef.current.clear()
    }

    const validInput = () => {
        return githubUsernameRegex.test(input);
    }

    return (
        <View style={styles.login}>
            <Input
                ref={inputRef}
                style={styles.input}
                selectionColor={Colors.green}
                textContentType="username"
                enablesReturnKeyAutomatically={true}
                placeholder={placeholder}
                rightIcon={<Button type="navigation" onPress={() => handleSubmit()} />}
                value={input}
                onSubmitEditing={() => handleSubmit()}
                onChangeText={text => setInput(text)}
            />
            <View style={styles.recents}>
                <Text h4 style={styles.recentsTitle}>Recents</Text>
                <View style={styles.wrapper}>
                    {Object.entries(users)
                        .sort(([aKey, aValue], [bKey, bValue]) => (aValue.timestamp > bValue.timestamp) ? -1 : ((bValue.timestamp > aValue.timestamp) ? 1 : 0))
                        .slice(0, 9)
                        .map(([key, user]) => {
                            console.log("RENDERED ELEMENT", user)
                            return (<Text style={styles.recent} key={key} onPress={() => props.logIn(user.name)}>{user.name}</Text>)
                        })}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    login: {
        backgroundColor: Colors.primaryDark,
        width: "100%",
        paddingHorizontal: 32,
    },
    input: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
        alignItems: "center",
    },
    recents: {
        marginTop: 32,
        padding: 8,
        alignItems: "center",
    },
    recentsTitle: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
        marginBottom: 16
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    recent: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.blue,
        margin: 8,
    },

});

export default Login



/**
 * Notes:
 *
 * 60: Sort map by object property timestamp to render 9 most recent users first
 */