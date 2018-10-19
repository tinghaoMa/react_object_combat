/**
 * @author itck_mth
 * @time 2018/10/11 11:13 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Girl from './Girl'
import NavigationBar from './NavigationBar'

export default class LifecycleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.log('constructor');
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
            </View>
        )
    }
    componentDidMount() {
        this.log('componentDidMount');
    }

    componentWillReceiveProps() {
        this.log('componentWillReceiveProps');
    }

    shouldComponentUpdate() {
        this.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(){
        this.log('componentWillUpdate');
    }

    componentDidUpdate() {
        this.log('componentDidUpdate');
    }

    componentWillUnmount() {
        this.log('componentWillUnmount');
    }



    log(msg) {
        console.log(msg)
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