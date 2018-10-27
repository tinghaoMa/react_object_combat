import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewPropTypes,
    Modal,
} from 'react-native';

import PropTypes from 'prop-types';

export default class MenuDialog extends React.Component {
    state = {
        visible: false
    };

    constructor(props) {
        super(props);
    }

    render() {

    }

    show() {
        this.setState({
            visible: true,
        })
    }

    dismiss() {
        this.setState({
            visible: false,
        })
    }
}
MenuDialog.propTyes = {
    menus: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    theme: PropTypes.object,
    onClose: PropTypes.func
}

MenuDialog.defaultProps = {
    menus: [],
}