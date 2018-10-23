/**
 * @author itck_mth
 * @time 2018/10/23 11:20 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    DeviceEventEmitter
} from 'react-native';

export default class BaseComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.themeListener = DeviceEventEmitter.addListener('updateTheme', (params) => {
            this.onThemeChange(params);
        });
    }

    componentWillUnmount() {
        this.themeListener && this.themeListener.remove();


    }

    onThemeChange(theme) {
        console.log('onThemeChange');
        if (!theme) return;
        this.setState({
            theme: theme
        })
    }
}