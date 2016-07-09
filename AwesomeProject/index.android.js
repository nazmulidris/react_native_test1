/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToastAndroid
} from 'react-native';

/**
 * http://stackoverflow.com/questions/29872918/how-to-add-a-button-in-react-native
 */
import Button from 'react-native-button';


class AwesomeProject extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Shake or press menu button for dev menu
                </Text>
                <Button
                    containerStyle={styles.buttonContainer}
                    style={styles.button}
                    onPress={this.buttonPressed}>
                    Press Me!
                </Button>
            </View>
        );
    }

    buttonPressed() {
        ToastAndroid.show("YAY! Button is pressed!", ToastAndroid.LONG);
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
        borderColor: '#CACACA',
        borderRadius: 8,
        backgroundColor: '#CACACA',
    },
    button: {
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#03A9F4',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
