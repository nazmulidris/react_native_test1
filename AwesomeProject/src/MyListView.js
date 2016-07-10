import React, {Component} from 'react';
import {ListView, Text, View, StyleSheet, DeviceEventEmitter} from 'react-native';

/**
 * ListView example: https://rnplay.org/apps/GWoFWg
 * ListViewDataSource docs: https://facebook.github.io/react-native/docs/listviewdatasource.html
 */

class MyListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msgRay: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
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

    componentWillMount() {
        DeviceEventEmitter.addListener("MyNativeToast", this.eventRcvdFromNative.bind(this));
    }

    eventRcvdFromNative(e:Event) {
        let msg = "Evt from Android: " + e.number;

        let msgRay = this.state.msgRay;
        let dataSrc = this.state.dataSource;

        msgRay.push(msg);
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


export {MyListView}