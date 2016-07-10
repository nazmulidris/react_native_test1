import React, {Component} from 'react';
import {ListView, Text, View, StyleSheet} from 'react-native';

class MyListView extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
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
}

const styles = StyleSheet.create({
    listview: {
        // width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        margin: 24,
    },
});


export {MyListView}