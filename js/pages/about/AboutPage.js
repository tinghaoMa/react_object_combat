/**
 * @author itck_mth
 * @time 2018/10/21 09:16:45 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Linking
} from 'react-native';

import ViewUtils from '../../utils/ViewUtils';
import {MORE_MENU} from '../../common/MoreMenu';
import GlobalStyles from "../../../res/styles/GlobalStyles";
import AboutCommon from './AboutCommon';
import config from '../../../res/data/config'
export default class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectModels: [],
        }
        this.aboutCommon = new AboutCommon(this.props, (dic) => this.updateState(dic),config);
    }

    componentDidMount() {
        this.aboutCommon.componentDidMount();
    }

    updateState(dic) {
        this.setState(dic);
    }

    renderContent(contentView, params) {
        return this.aboutCommon.renderContent(contentView, params);
    }

    render() {
        return this.renderContent(this.renderContentView(), {
            'name': 'GitHub Popular',
            'description': '这是一个用来查看GitHub最受欢迎与最热项目的App,它基于React Native支持Android和iOS双平台。',
            'avatar': 'https://avatars1.githubusercontent.com/u/12714430?s=460&v=4',
            'backgroundImg': 'data:image/jpeg;base64,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',
        })
    }

    onClick(tab) {
        switch (tab) {
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.WebSite:
                this.toWebSite();
                break;
            case MORE_MENU.FeedBack:
                this.feedBack();
                break;
        }
        console.log(tab);
    }

    toWebSite() {
        const {navigation} = this.props;
        navigation.navigate('MyWebSite', {
            url: 'https://github.com/tinghaoMa',
            title: 'GitHub'
        });
    }

    feedBack() {
        let url = 'https://github.com/tinghaoMa';
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch(err => console.error('An error occurred', err));
    }

    renderContentView() {
        return <View>
            {this.aboutCommon.renderRepository(this.state.projectModels)}
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.WebSite),
                require('../../../res/images/ic_computer.png'),
                'WebSite',
                {tintColor: '#2196f3'},
                null,
            )}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.About_Author),
                require('../../../res/images/ic_insert_emoticon.png'),
                'AboutAuthor',
                {tintColor: '#2196f3'},
                null,
            )}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.FeedBack),
                require('../../../res/images/ic_feedback.png'),
                'FeedBack',
                {tintColor: '#2196f3'},
                null,
            )}
            <View style={GlobalStyles.line}/>
        </View>

    }
}