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

    constructor(props) {
        super(props);
        this.state = {
            img_url: "https://goo.gl/vRNu5m",
            time_str: "Current Time"
        };
        this.updateImageURI = this.updateImageURI.bind(this);
    }

    updateImageURI(url) {
        this.setState({img_url: url});
    }

    updateTime() {
        let dateFormat = require('dateformat')
        let formattedDate = dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
        this.setState({time_str: formattedDate});
    }

    /**
     * evaluate the time so that empty string for time doesnt get displayed in screen.
     * without a call to this method the UI will display "Current Time" at load
     */
    componentWillMount() {
        this.updateTime();
    }

    /** set a recurring timer to update the time state string */
    componentDidMount() {
        this.timer = setInterval(this.updateTime.bind(this), 1000);
    }

    /** stop the timer when the component is removed */
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.time_str}
                </Text>
                <Image source={{uri: this.state.img_url}} style={styles.image}/>
                <Button
                    containerStyle={styles.buttonContainer}
                    style={styles.button}
                    onPress={this.buttonPressed.bind(this)}>
                    Press Me!
                </Button>
                <Text style={[{flex:1},styles.instructions]}>
                    To get started, edit index.android.js. Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }

    buttonPressed() {
        this.updateImageURI("https://goo.gl/B94hp8");
        ToastAndroid.show("YAY! Button is pressed!", ToastAndroid.LONG);
    }
}

const styles = StyleSheet.create({
    image: {
        margin: 24,
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
        marginTop: 24,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        backgroundColor: '#DADADA',
    },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
