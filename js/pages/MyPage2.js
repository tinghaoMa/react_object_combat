/**
 * @author itck_mth
 * @time 2018/10/20 11:33 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight, ViewPropTypes,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';

import {MORE_MENU} from '../common/MoreMenu';
import GlobalStyles from '../../res/styles/GlobalStyles';
import ViewUtils from '../../js/utils/ViewUtils';
import PropTypes from "prop-types";
import CustomThemePage from "./CustomThemePage";

export default class MyPage2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customThemeView: false
        }
    }

    render() {
        let navNar = <NavigationBar
            title={'我的'}
        />
        return <View style={GlobalStyles.root_container}>
            {navNar}
            <ScrollView>
                <TouchableHighlight
                    onPress={() => this._onClick(MORE_MENU.About)}
                >
                    <View style={[styles.item, {height: 90}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                style={[{width: 40, height: 40, marginRight: 10}, {tintColor: '#2196f3'}]}
                                source={require('../../res/images/ic_trending.png')}
                            />
                            <Text>
                                Giuhub Popular
                            </Text>
                        </View>
                        <Image
                            style={[{
                                marginRight: 10,
                                height: 22,
                                width: 22
                            },
                                {tintColor: '#2196f3'}
                            ]}
                            source={require('../../res/images/ic_tiaozhuan.png')}
                        />
                    </View>
                </TouchableHighlight>
                <View style={GlobalStyles.line}/>
                <Text style={styles.groupTitle}>趋势管理</Text>
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Custom_Language, require('../../res/images/ic_custom_language.png'), '自定义语言')}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Sort_Language, require('../../res/images/ic_swap_vert.png'), '语言排序')}
                <View style={GlobalStyles.line}/>


                <Text style={styles.groupTitle}>标签管理</Text>
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Custom_Key, require('../../res/images/ic_custom_language.png'), '自定义标签')}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Sort_Key, require('../../res/images/ic_swap_vert.png'), '标签排序')}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Remove_Key, require('../../res/images/ic_remove.png'), '标签移除')}
                <View style={GlobalStyles.line}/>

                <Text style={styles.groupTitle}>设置</Text>
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Custom_Theme, require('../../res/images/ic_view_quilt.png'), '自定义主题')}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.About_Author, require('../../res/images/ic_insert_emoticon.png'), '关于作者')}
            </ScrollView>
            {this.renderCustomThemePage()}
        </View>
    }

    getItem(tag, icon, text) {
        return ViewUtils.getSettingItem(() => this._onClick(tag),
            icon,
            text,
            {tintColor: '#2196f3'},
            null
        )
    }

    _onClick(tab) {
        const {navigation} = this.props;
        switch (tab) {
            case MORE_MENU.Custom_Language:
            case MORE_MENU.Sort_Language:
            case MORE_MENU.Custom_Key:
            case MORE_MENU.Sort_Key:
            case MORE_MENU.About_Author:
            case MORE_MENU.About:
                navigation.navigate('AboutPage', {
                    tab: tab
                })
                break;
            case MORE_MENU.Custom_Theme:
                this.setState({
                    customThemeView: true,
                })
                break;
        }

    }

    renderCustomThemePage() {
        return <CustomThemePage
            visible={this.state.customThemeView}
            onClose={() => {
                this.setState({
                    customThemeView: false,
                })
            }}
        />
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: 60,
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }

});