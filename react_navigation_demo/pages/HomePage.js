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
        title:'hello world'
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
                        navigation.navigate('Page2')
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
