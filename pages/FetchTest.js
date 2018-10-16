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
} from 'react-native';


export default class FetchTest extends Component {
    constructor(props) {
        super();
        this.state = {
            result: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    width: 100,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red'
                }}>
                    <Text
                        style={styles.welcome}
                        onPress={() => this._fetchData('http://rap2api.taobao.org/app/mock/94657/example/mytest')}
                    >获取数据</Text>
                </View>

                <View style={{
                    width: 100,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'blue'
                }}>
                    <Text
                        style={styles.welcome}
                        onPress={() => this._pushData('http://rap2api.taobao.org/app/mock/94657/example/login',
                            {username: 'mth', password: '123456'})}
                    >提交数据</Text>
                </View>

                <Text style={styles.welcome}>
                    返回结果 = {this.state.result}
                </Text>
            </View>
        );
    }

    _fetchData(url) {
        fetch(url).then(response => response.json()).then(result => {
            this.setState({
                result: JSON.stringify(result)
            })
        }).catch(error => {
            this.setState({
                result: '错误' + JSON.stringify(error)
            })
        })
    }

    _pushData(url, param) {
        fetch(url, {
            method: 'Post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(param)
        }).then(response => response.json()).then(result => {
            this.setState({
                result: JSON.stringify(result)
            })
        }).catch(error => {
            this.setState({
                result: '错误' + JSON.stringify(error)
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
    welcome: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    button: {}
});
