/**
 * @author itck_mth
 * @time 2018/10/27 11:52
 * @class describe
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

export default class TestPage extends React.Component {

    static propTypes = {
        titleView: PropTypes.element,
        content: PropTypes.string.isRequired,
        style: ViewPropTypes.style,
    }
    static defaultProps = {
        content: '没有传该属性'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={[this.props.style, {fontSize: 50}]}>
                {this.props.content}
                </Text>
            {this.props.titleView}
        </View>
    }
}