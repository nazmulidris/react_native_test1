/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry, StyleSheet, Text, View, ToastAndroid, Image
} from 'react-native';

/**
 * http://stackoverflow.com/questions/29872918/how-to-add-a-button-in-react-native
 */
import Button from 'react-native-button';


class AwesomeProject extends Component {

    constructor() {
        super();
        this.state = {
            img_url: "https://goo.gl/vRNu5m"
        }
        // this.update = this.update.bind(this);
    }

    update(url) {
        this.setState({img_url: url});
    }

    render() {
        let dateFormat = require('dateformat')
        let formattedDate = dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT");

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {formattedDate}
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js. Shake or press menu button for dev menu
                </Text>
                <Image source={{uri: this.state.img_url}} style={styles.image}/>
                <Button
                    containerStyle={styles.buttonContainer}
                    style={styles.button}
                    onPress={this.buttonPressed.bind(this)}>
                    Press Me!
                </Button>
            </View>
        );
    }

    buttonPressed() {
        this.update("https://goo.gl/B94hp8");
        ToastAndroid.show("YAY! Button is pressed!", ToastAndroid.LONG);
    }
}

const styles = StyleSheet.create({
    image: {
        margin: 20,
        width: 150,
        height: 150,
    },
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
