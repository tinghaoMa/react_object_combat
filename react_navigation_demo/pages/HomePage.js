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


type Props = {};
export default class HomePage extends Component<Props> {

    static navigationOptions={
        title:'hello world',
        headerBackTitle:'返回哈哈',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: 'yellow',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    render() {
        const {navigation}=this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎来到HomePage
                </Text>
                <Button
                    title='Go To Page1'
                    onPress={()=>{
                        navigation.navigate('Page1',{name:'动态的'})
                    }}
                ></Button>
                <Button
                    title='Go To Page2'
                    onPress={()=>{
                        navigation.navigate('Page2',{test:'hello'})
                    }}
                ></Button>
                <Button
                    title='Go To Page3'
                    onPress={()=>{
                        navigation.navigate('Page3',{title:'hello world',name:'thm react native'})
                    }}
                ></Button>
                <Button
                    title='Go To TabNavigator'
                    onPress={()=>{
                        navigation.navigate('TabNav')
                    }}
                ></Button>
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
