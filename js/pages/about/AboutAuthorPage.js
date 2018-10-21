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

const FLAG = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {
            PERSONAL_BLOG: {
                title: '个人博客',
                url: 'http://jiapenghui.com',
            },
            CSDN: {
                title: 'CSDN',
                url: 'http://blog.csdn.net/fengyuzhengfan',
            },
            JIANSHU: {
                title: '简书',
                url: 'http://www.jianshu.com/users/ca3943a4172a/latest_articles',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/crazycodeboy',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '1586866509',
            },
            Email: {
                title: 'Email',
                account: 'crazycodeboy@gmail.com',
            },
        }
    },
    QQ: {
        name: '技术交流群',
        items: {
            MD: {
                title: '移动开发者技术分享群',
                account: '335939197',
            },
            RN: {
                title: 'React Native学习交流群',
                account: '165774887',
            }
        },
    },
}
export default class AboutAuthorPage extends React.Component {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(this.props, (dic) => this.updateState(dic), config);
        this.state = {
            projectModels: [],
            author: config.author,
            showRepository: false,
            showBlog: false,
            showQQ: false,
            showContact: false,
        }

    }

    componentDidMount() {
        // this.aboutCommon.componentDidMount();
    }

    updateState(dic) {
        this.setState(dic);
    }

    renderContent(contentView, params) {
        return this.aboutCommon.renderContent(contentView, params);
    }

    render() {
        return this.renderContent(this.renderContentView(), this.state.author);
    }

    onClick(tab) {
        switch (tab) {
            case FLAG.REPOSITORY:
                this.updateState({showRepository: !this.state.showRepository})
                break;
            case FLAG.BLOG:
                this.updateState({showBlog: !this.state.showBlog})
                break;
            case FLAG.QQ:
                this.updateState({showQQ: !this.state.showQQ})
                break;
            case FLAG.CONTACT:
                this.updateState({showContact: !this.state.showContact})
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

    /**
     * 获取item右侧图标
     * @param isShow
     */
    getClickIcon(isShow) {
        return isShow ? require('../../../res/images/ic_tiaozhuan_up.png') : require('../../../res/images/ic_tiaozhuan_down.png');
    }

    renderContentView() {
        let content = <View>
            {ViewUtils.getSettingItem(() => this.onClick(FLAG.BLOG), require('../../../res/images/ic_computer.png'),
                FLAG.BLOG.name,
                {tintColor: '#2196f3'},
                this.getClickIcon(this.state.showBlog))}
            <View style={GlobalStyles.line}/>
            {this.state.showBlog ? this.renderItems(FLAG.BLOG.items) : null}

            {ViewUtils.getSettingItem(() => this.onClick(FLAG.REPOSITORY),
                require('../../../res/images/ic_code.png'), FLAG.REPOSITORY, {tintColor: '#2196f3'},
                this.getClickIcon(this.state.showRepository))}
            <View style={GlobalStyles.line}/>
            {this.state.showRepository ? this.aboutCommon.renderRepository(this.state.projectModels) : null}

            {ViewUtils.getSettingItem(() => this.onClick(FLAG.QQ),
                require('../../../res/images/ic_computer.png'), FLAG.QQ.name, {tintColor: '#2196f3'},
                this.getClickIcon(this.state.showQQ))}
            <View style={GlobalStyles.line}/>
            {this.state.showQQ ? this.renderItems(FLAG.QQ.items, true) : null}

            {ViewUtils.getSettingItem(() => this.onClick(FLAG.CONTACT),
                require('../../../res/images/ic_contacts.png'),
                FLAG.CONTACT.name, {tintColor: '#2196f3'},
                this.getClickIcon(this.state.showContact))}
            <View style={GlobalStyles.line}/>
            {this.state.showContact ? this.renderItems(FLAG.CONTACT.items, true) : null}
        </View>
        return content;
    }

    /**
     * 显示列表数据
     * @param dic
     * @param isShowAccount
     */
    renderItems(dic, isShowAccount) {
        if (!dic) return null;
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtils.getSettingItem(() => this.onClick(dic[i]),
                        '',
                        title,
                        {tintColor: '#2196f3'},
                        null)}
                    <View style={GlobalStyles.line}/>
                </View>
            )
        }
        return views;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

