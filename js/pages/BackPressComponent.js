/**
 * @author itck_mth
 * @time 2018/10/26 9:09 AM
 * @class describe
 */

import React, {Component} from 'react';
import {
    BackHandler
} from 'react-native';

export default class BackPressComponent {

    constructor(props) {
        this.props = props;
        this._hardwareBackPress = this.onHardWareBackPress.bind(this);
    }

    componentDidMount() {
        if (this.props.backPress) {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
        }
    }

    componentWillUnmount() {
        this.backHandler && this.backHandler.remove();
    }

    onHardWareBackPress(event) {
        return this.props.backPress(event);
    }

}
