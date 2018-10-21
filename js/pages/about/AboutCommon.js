/**
 * @author itck_mth
 * @time 2018/10/21 09:16:45 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../utils/ViewUtils';
import FavoriteDao from '../../../js/expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../../expand/dao/DataRepository';
import RepsitoryUtils from '../../expand/dao/RepsitoryUtils';
import Utils from "../../utils/Utils";
import RepostoryCell from '../../common/RepostoryCell';

export default class AboutCommon {
    constructor(props, updateState, config) {
        this.props = props;
        this.updateState = updateState;
        this.config = config;
        this.repositories = [];
        this.favoriteKeys = null;
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.repsitoryUtils = new RepsitoryUtils(this);
        this.flag = true;
    }

    getParallaxRenderConfig(params) {
        let config = {};
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        )


        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar} source={{
                    uri: params.avatar,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }}/>
                <Text style={styles.sectionSpeakerText}>
                    {params.name}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.description}
                </Text>
            </View>
        )

        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        )

        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtils.getButton(require('../../../res/images/ic_arrow_back_white_36pt.png'), () => {
                    const {navigation} = this.props;
                    navigation.pop();
                })}
            </View>
        )
        return config;
    }

    renderContent(contentView, params) {
        let config = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                headerBackgroundColor="#333"
                contentBackgroundColor="pink"
                backgroundColor={'#2196f3'}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                backgroundSpeed={10}
                {...config}
            >
                {contentView}
            </ParallaxScrollView>
        );
    }

    onNotifyDataChanged(items) {
        this.updateFavorite(items);
    }

    componentDidMount() {
        console.log(`this.flag =${this.flag}`);
        if (!this.flag) {
            this.repsitoryUtils.fetchRepository(this.config.info.currentRepoUrl);
        } else {
            let urls = [];
            let items = this.config.items;
            for (let i = 0; i < items.length; i++) {
                urls.push(this.config.info.url + items[i]);
            }
            this.repsitoryUtils.fetchRepositories(urls);
        }
        this.flag = !this.flag;
    }

    async updateFavorite(repositories) {
        if (!repositories) {
            return;
        }
        this.repositories = repositories;
        if (!this.favoriteKeys) {
            this.favoriteKeys = await this.favoriteDao.getFavoriteKeys();
        }

        let projectModels = [];
        let items = this.repositories;
        for (let i = 0; i < items.length; i++) {
            let data = items[i];
            console.log(JSON.stringify(data));
            let isFavorite = Utils.checkFavorite(data, this.favoriteKeys ? this.favoriteKeys : []);
            projectModels.push({
                item: data.item ? data.item : data,
                isFavorite: isFavorite
            });
        }

        this.updateState({
            projectModels: projectModels,
        })
    }

    renderRepository(projectModels) {
        if (!projectModels || projectModels.length === 0) return null;
        let views = [];
        for (let i = 0; i < projectModels.length; i++) {
            let projectModel = projectModels[i];
            views.push(
                <RepostoryCell
                    onFavorite={(item, isFavorite) => {
                        // this.onFavorite(item, isFavorite);
                    }}
                    key={projectModel.item.id}
                    onSelect={() => {
                        // this.onSelect(projectModel)
                    }}
                    projectModel={projectModel}/>
            );
        }
        return views;
    }


    /**
     * 点击收藏的回调函数
     * @param item
     * @param isFavorite
     */
    onFavorite(item, isFavorite) {
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item))
        } else {
            this.favoriteDao.removeFavoriteItem(item.id.toString());
        }
    }


    onSelect(projectModel) {
        const {navigation} = this.props;
        navigation.navigate('WebViewPage', {
            refresh: () => {

            },
            projectModel: projectModel,
        });
    }

}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',

    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        left: 0,
        top: 10,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});