/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import {
    AppRegistry, StyleSheet, Text, View, Image, TextInput, Dimensions, ScrollView, DeviceEventEmitter
} from 'react-native';

/** import the native android component from JS module wrapping it */
import MyNativeToast from './MyNativeToast_Module';

/**
 * http://stackoverflow.com/questions/29872918/how-to-add-a-button-in-react-native
 */
import Button from 'react-native-button';

import {ListView} from './MyListView';

class AwesomeProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            img_url: images.jarvis_image,
            time_str: "Current Time",
            text_str: "User Input",
            debug_txt: "N/A",
        };
        this.updateImageURI = this.updateImageURI.bind(this);
    }

    updateImageURI(url) {
        this.setState({img_url: url});
    }

    updateTime() {
        let dateFormat = require('dateformat');
        let formattedDate = dateFormat(Date.now(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
        this.setState({time_str: formattedDate});
    }

    /**
     * evaluate the time so that empty string for time doesnt get displayed in screen.
     * without a call to this method the UI will display "Current Time" at load
     */
    componentWillMount() {
        this.updateTime();
        DeviceEventEmitter.addListener("MyNativeToast", this.eventRcvdFromNative.bind(this));
    }

    eventRcvdFromNative(e:Event) {
        this.setState({debug_txt: "Evt from Android: " + e.number});
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
            <ScrollView>
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
                    <TextInput
                        style={styles.textinput}
                        placeholder="Type something here"
                        onChangeText={(text)=>this.setState({text_str:text})}
                    />
                    <Text style={styles.welcome}>
                        {this.state.debug_txt}
                    </Text>
                    <Text style={styles.instructions}>
                        You typed: '{this.state.text_str}'. To get started,
                        edit index.android.js. Shake or press menu button for dev menu
                    </Text>
                </View>
            </ScrollView>
        );
    }

    _message;

    buttonPressed() {

        let path = 0;
        let imgURL = images.naz_image;
        let randNum = Math.floor((Math.random() * 10) + 1);

        if (randNum >= 7) {
            path = 0;
        }
        else if (randNum >= 3) {
            path = 1;
        }
        else if (randNum >= 0) {
            path = 2;
        }

        switch (path) {
            case 0:
                imgURL = images.naz_image;
                break;
            case 1:
                imgURL = images.cayman_image
                break;
            case 2:
                imgURL = images.ironman_image;
                break;
        }

        this.updateImageURI(imgURL);
        let _message = "Button is pressed, loading random image: " + imgURL;


        switch (path) {
            case 0:// simple
            {
                MyNativeToast.show(_message, MyNativeToast.SHORT);
                this.setState({debug_txt: "Native toast worked (simple)!"})
            }
                break;
            case 1:// callbacks
            {
                MyNativeToast.show_callbacks(
                    _message,
                    MyNativeToast.SHORT,
                    (msg)=>this.setState({debug_txt: msg}),
                    (e)=>this.setState({debug_txt: e}));
            }
                break;
            case 2:// promise
            {
                async function call_show() {
                    try {
                        var msg = await MyNativeToast.show_promise(_message, MyNativeToast.SHORT);
                        this.setState({debug_txt: msg});

                    } catch (e) {
                        this.setState({debug_txt: e});
                    }
                }

                // fucking javascript bullshit!
                call_show = call_show.bind(this);
                call_show();
            }
                break;
        }

    }// end buttonPresssed()

}// end class AwesomeProject

const images = {
    jarvis_image: '@drawable/jarvis', // this image is loaded from android/res
    ironman_image: '@drawable/ironman', // this image is loaded from android/res
    naz_image: "https://goo.gl/vRNu5m", // this image is loaded from URI that's been shortened!
    cayman_image: "https://goo.gl/B94hp8", // this image is loaded from URI that's been shortened!
};

const styles = StyleSheet.create({
    textinput: {
        // width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        margin: 24,
    },
    image: {
        margin: 24,
        width: 300,
        height: 300,
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
        flex: 1,
        marginTop: 24,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        backgroundColor: '#DADADA',
    },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);