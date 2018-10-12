/**
 * @author itck_mth
 * @time 2018/10/11 4:24 PM
 * @class describe
 */


import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class Page1 extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎来到 Page1
                </Text>
                <Button
                    title='Go Back'
                    onPress={()=>{
                        navigation.goBack();
                    }}
                />
                <Button
                    title='改变主题'
                    onPress={()=>{
                        navigation.setParams({
                            theme:{
                                tintColor:'orange',
                                updateTime:new Date().getTime()
                            }
                        })
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
