/**
 * @author itck_mth
 * @time 2018/10/20 11:33 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';

import GlobalStyles from '../../res/styles/GlobalStyles';

export default class TabPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {navigation} = this.props;
        let tab = navigation.getParam('tab', 'hello')
        return <View style={[GlobalStyles.root_container]}>
            <NavigationBar
                title={'标签'}
                leftButton={this.renderBackButon()}
            />
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: 'red', backgroundColor: 'orange'}}>{tab}</Text>
            </View>
        </View>
    }

    renderBackButon() {
        return <TouchableOpacity
            onPress={() => {
                this.props.navigation.pop();
            }}

        >
            <Image
                style={{width: 26, height: 26}}
                source={require('../../res/images/ic_arrow_back_white_36pt.png')}
            />
        </TouchableOpacity>
    }
}
