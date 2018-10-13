/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import styles from '../../styles/index';


export default class About extends Component {
    constructor() {
        super();
        console.log('hello About');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>
                    About Us
                </Text>
            </View>
        );
    }
}

