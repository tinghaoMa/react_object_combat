/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
} from 'react-native';

const CITY_NAMES = () => {
    let citys = [];
    for (let i = 0; i < 3; i++) {
        citys.push({key: i + '', value: '第' + i + '个城市'})
    }
    return citys;
};
export default class FlatListDemo extends Component {


    constructor(props) {
        super();
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES(),
        };
    }

    _keyExtractor = (item, index) => {
        console.log(`item.key = ${item.key}`);
        console.log(`index = ${index}`);
        return item.key;
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataArray}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => this._renderItem(item)}
                    // refreshing={this.state.isLoading}
                    // onRefresh={
                    //     () => {
                    //         this._loadData();
                    //     }
                    // }
                    refreshControl={
                        <RefreshControl
                            title='loading'
                            colors={['red']}
                            titleColor={'blue'}
                            refreshing={this.state.isLoading}
                            onRefresh={
                                () => {
                                    this._loadData();
                                }
                            }
                        />
                    }
                />
            </View>
        );
    }

    _renderItem(item) {
        return <View style={styles.item}>
            <Text style={styles.welcome}>{item.value}</Text>
        </View>;
    }

    _loadData() {
        this.setState({
            isLoading: true,
        });
        setTimeout(() => {
            let citys = [];
            for (let i = 0; i < 3; i++) {
                citys.push({key: i + '', value: '第1' + i + '1个城市'})
            }
            this.setState({
                isLoading: false,
                dataArray: citys,
            })
        }, 2000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    item: {
        backgroundColor: 'red',
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
