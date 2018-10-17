/**
 * @author itck_mth
 * @time 2018/10/17 10:53 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../utils/ViewUtils';

import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';

export default class MyPage extends Component {

    constructor() {
        super();
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            dataArray: []
        }
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                title='自定义标签'
                leftButton={ViewUtils.getButton(require('../../res/images/ic_arrow_back_white_36pt.png'), () => {
                    this.leftBtnClick();
                })}
                rightButton={ViewUtils.getButton(require('../../res/images/ic_favorite.png'), () => {
                    this.rightBtnClick();
                })}
            />
            <ScrollView
            >
                {this.renderView()}

            </ScrollView>
        </View>
    }


    componentDidMount() {
        this.loadData();
    }

    leftBtnClick() {

    }

    rightBtnClick() {

    }

    renderView() {
        return <Text>
            {JSON.stringify(this.state.dataArray)}
        </Text>
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error => {
                    console.log('获取自定义标签出错' + error)
                }
            )
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