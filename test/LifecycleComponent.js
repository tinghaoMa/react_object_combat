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
    ScrollView
} from 'react-native';
import timer from 'react-native-timer'
import NavigationBar from './NavigationBar'

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
                <Text style={styles.text}>{this.state.content}</Text>
                <Text style={styles.text}>{this.props.name}</Text>
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
        backgroundColor: 'gray',
    },
    text: {
        fontSize: 20,
        color: 'blue'
    }
});