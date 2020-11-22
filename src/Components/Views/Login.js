import React, { useState, createRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input } from 'react-native-elements';
import githubUsernameRegex from 'github-username-regex';


import { Colors } from '../../styles/colors'
import Button from '../Atoms/Button';

const Login = props => {

    const placeholder = "Yo, what's your name?"
    const [input, setInput] = useState("")
    const inputRef = React.createRef();


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
        alignItems: "center",

    },
    recentsTitle: {
        fontFamily: 'DMMono_500Medium',
        color: Colors.white,
    },

});

export default Login