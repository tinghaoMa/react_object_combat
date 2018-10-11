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
    Button,
    TextInput
} from 'react-native';

export default class Page3 extends Component {
    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎来到 Page3
                </Text>
                <Button
                    title='Go Back'
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setParams({title: text});
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
    input: {
        height: 50,
        borderWidth: 1,
        marginTop: 20,
        borderColor: 'black',
        width:360,
    },
});
