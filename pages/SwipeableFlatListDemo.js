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
    ActivityIndicator,
    SwipeableFlatList,
    TouchableHighlight,
} from 'react-native';

const CITY_NAMES = () => {
    let citys = [];
    for (let i = 0; i < 10; i++) {
        citys.push({key: i + '', value: '第' + i + '个城市'})
    }
    return citys;
};
export default class SwipeableFlatListDemo extends Component {


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
                <SwipeableFlatList
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
                                    this._loadData(true);
                                }
                            }
                        />
                    }

                    ListFooterComponent={() => {
                        return this._genIndicator();
                    }}

                    onEndReached={() => {
                        this._loadData(false)
                    }}

                    renderQuickActions={() => this._genQuickActions()}
                    maxSwipeDistance={100}
                    bounceFirstRowOnMount={true}

                />
            </View>
        );
    }

    _renderItem(item) {
        return <View style={styles.item}>
            <Text style={styles.welcome}>{item.value}</Text>
        </View>;
    }

    _loadData(pullRefresh) {
        if (pullRefresh) {
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
        } else {
            setTimeout(() => {
                let citys = [];
                for (let i = 0; i < 3; i++) {
                    citys.push({key: i + '', value: '加载更多 第1' + i + '1个城市'})
                }
                citys = this.state.dataArray.concat(citys);
                this.setState({
                    isLoading: false,
                    dataArray: citys,
                })
            }, 2000);
        }

    }

    _genIndicator() {
        return <View style={styles.indicator}>
            <ActivityIndicator
                size='large'
                color='red'
                animating={true}
            />
            <Text style={styles.welcome}>正在加载更多....</Text>
        </View>
    }

    /**
     * 侧滑菜单
     * @private
     */
    _genQuickActions() {
        return <View style={styles.quickContainer}>
            <TouchableHighlight
                onPress={()=>{
                    alert('确认删除？');
                }}
                >
                <View style={styles.quick}>
                    <Text style={styles.welcome}>
                        删除
                    </Text>
                </View>

            </TouchableHighlight>
        </View>
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
        backgroundColor: 'blue',
        height: 150,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    quick:{
        backgroundColor:'red',
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center',
        padding:10,
        width:200,

    },
    quickContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:15,
        marginBottom:15,
    },

});
