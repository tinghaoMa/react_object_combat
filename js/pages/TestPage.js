/**
 * @author itck_mth
 * @time 2018/10/27 11:52
 * @class describe
 */

import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import TestContntePage from './TestContentPage';


export default class TestPage extends React.Component {

    render() {
        return <View style={{flex: 1, backgroundColor: 'orange'}}>
            <TestContntePage
                content={'哈哈哈哈'}
                style={{backgroundColor: 'red', fontWeight: '500'}}
                titleView={this.renderTitleView() }
            />
        </View>
    }

    renderTitleView(){
        return <Text>i am title</Text>
    }
}