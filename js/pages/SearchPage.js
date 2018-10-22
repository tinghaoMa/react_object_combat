/**
 * @author itck_mth
 * @time 2018/10/22 9:41 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import NavigationBar from "../common/NavigationBar";

export default class FavoritePage extends React.Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;

        this.state = {}
    }

    render() {

        return <View style={styles.container}>
            <NavigationBar
                title={'搜索'}
            />
        </View>
    }


}

class FavoriteTab extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return <View style={styles.container}>


        </View>
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 15,
        margin: 10,
    },
    input: {
        height: 20,
        borderWidth: 1
    }
});
