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
    SectionList,
    ActivityIndicator,
} from 'react-native';

const CITY_NAMES = [{title:'一线城市',data:['a','b','c','d']},
                    {title:'二线城市',data:['a2','b2','c2','d2']},
                    {title:'三线城市',data:['a3','b3','c3','d3']}];
export default class SectionListDemo extends Component {


    constructor(props) {
        super();
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES,
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
                <SectionList
                    renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.item}>
                            <Text style={{ fontWeight: "bold" }}>{title}</Text>
                        </View>
                    )}
                    sections={CITY_NAMES}
                    keyExtractor={this._keyExtractor}
                    ItemSeparatorComponent={
                        ()=>(<View style={{backgroundColor:'green',height:10,}}/>)
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

    _loadData(pullRefresh) {
        if(pullRefresh){
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
        }else{
            setTimeout(()=>{
                let citys = [];
                for (let i = 0; i < 3; i++) {
                    citys.push({key: i + '', value: '加载更多 第1' + i + '1个城市'})
                }
                citys=this.state.dataArray.concat(citys);
                this.setState({
                    isLoading: false,
                    dataArray: citys,
                })
            },2000);
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
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
        backgroundColor: 'orange',
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator:{
        flexDirection:'row',
        justifyContent:'center',

    }
});
