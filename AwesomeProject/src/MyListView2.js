import React, {Component} from 'react';
import {ListView, Text, View, StyleSheet, DeviceEventEmitter} from 'react-native';
/** import the native android component from JS module wrapping it */
import MyNativeToast from './MyNativeToast_Module';

/**
 * ListView example: https://rnplay.org/apps/GWoFWg
 * ListViewDataSource docs: https://facebook.github.io/react-native/docs/listviewdatasource.html
 * Fetch API - https://jakearchibald.com/2015/thats-so-fetch/
 */

class MyListView2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msgRay: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
        this.makeNetworkCall();
    }

    render() {
        return (
            <View style={styles.listview}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
                />
            </View>
        );
    }

    async makeNetworkCall() {
        try {
            MyNativeToast.show("Making network call to fetch json data", MyNativeToast.SHORT);
            let response = await fetch('http://facebook.github.io/react-native/movies.json');
            MyNativeToast.show("Got json data from network", MyNativeToast.SHORT);
            let jsonObject = await response.json();
            this.updateListViewWithData(jsonObject);
        } catch (error) {
            MyNativeToast.show(error, MyNativeToast.LONG);
        }
    }

    updateListViewWithData(jsonObject) {

        let msgRay = this.state.msgRay;
        let dataSrc = this.state.dataSource;

        movies = jsonObject.movies;
        for(let i=0; i<movies.length; i++){
            msgRay.push(movies[i].title);
        }

        this.setState({
            dataSource: dataSrc.cloneWithRows(msgRay)
        });
    }

}

const styles = StyleSheet.create({
    listview: {
        // width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        margin: 24,
    },
});


export {MyListView2}