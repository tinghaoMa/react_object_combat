/**
 * @author itck_mth
 * @time 2018/10/11 11:13 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    ImageBackground
} from 'react-native';
import timer from 'react-native-timer'
import NavigationBar from './NavigationBar'
import BitButton from './BigButton'

const age = Platform.select({
    ios: 10,
    android: 100,
});

export default class LifecycleComponent extends React.Component {

    constructor(props) {
        super(props);
        this.log('传递来的属性 = ' + this.props.name);
        this.state = {
            content: '开始',
            length: 0,
        }
        this.log('constructor');
        this.props.loaded();
    }

    componentWillMount() {
        this.log('componentWillMount');
    }

    render() {
        this.log('render');
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'LifecycleTest'}
                    statusBar={{
                        backgroundColor: 'red',
                    }}
                />


                {/*
                <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                       style={{width: 200, height: 200}} />

                <Image source={require('../res/images/ic_computer.png')}/>
                <BitButton/>

                <ImageBackground  style={{width: '50%', height: '50%'}}
                    source={{uri: 'https://facebook.github.io/react/logo-og.png'}}>
                    <Text style={styles.text}>{this.state.content}</Text>
                    <Text style={styles.text}>{this.props.name}</Text>
                    <Text style={styles.text}>根据平台选择变量值为{age}</Text>
                </ImageBackground>
                */}
            </View>
        )

    }

    componentDidMount() {
        timer.setTimeout('updateText', () => {
            this.setState({
                content: '模拟update--倒计时结束更新文案成功',


            });
        }, 2000);
        this.log('componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        this.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps) {
        this.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate() {
        this.log('componentWillUpdate');
    }

    componentDidUpdate() {
        this.log('componentDidUpdate');
    }

    componentWillUnmount() {
        this.log('componentWillUnmount');
    }


    log(msg) {
        console.log(msg);
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                backgroundColor: 'red',
            },
            android: {
                backgroundColor: 'orange',
            },
        })
    },
    text: {
        fontSize: 20,
        color: 'blue'
    }
});