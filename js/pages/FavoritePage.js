import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native';
import RepostoryCell from '../common/RepostoryCell'
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import Toast, {DURATION} from 'react-native-easy-toast'
import ProjectModel from '../model/ProjectModel'
import FavoriteDao from '../expand/dao/FavoriteDao';
import NavigationBar from "../common/NavigationBar";

export default class FavoritePage extends React.Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;

        this.state = {}
    }

    componentDidMount() {
        this.loadData();
        this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
            this.toast.show(text, DURATION.LENGTH_SHORT);
        });
    }

    componentWillMount() {
        this.listener && this.listener.remove();
    }

    loadData() {
        // this.setState({
        //     language: result
        // })
    }

    render() {
        let content = this.renderContent();
        return <View style={styles.container}>
            <NavigationBar
                title={'FavoritePage'}
            />
            {content}
            <Toast ref={toast => this.toast = toast}/>
        </View>
    }


    renderContent() {
        return <ScrollableTabView
            renderTabBar={() =>
                <ScrollableTabBar/>
            }
            tabBarBackgroundColor={'#2196f3'}
            tabBarActiveTextColor={'mintcream'}
            tabBarInactiveTextColor={'white'}
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}
            }
        >
            <FavoriteTab tabLabel={'popular'} flag={FLAG_STORAGE.flag_popular} key={'popular'} {...this.props}/>
            <FavoriteTab tabLabel={'trending'} flag={FLAG_STORAGE.flag_trending} key={'trending'} {...this.props}/>
        </ScrollableTabView>
    }
}

class FavoriteTab extends React.Component {

    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isLoading: false,
        }
    }

    render() {
        return <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={(data) => this._renderRow(data)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.loadData()}
                        colors={['red', 'green', 'orange']}
                    />
                }
            />

        </View>
    }

    onSelect(projectModel) {
        const {navigation} = this.props;
        navigation.navigate('WebViewPage', {
            refresh: () => {
                this._refresh();
            },
            projectModel: projectModel,
        });
    }

    _renderRow(projectModel) {
        return <RepostoryCell
            onFavorite={(item, isFavorite) => {
                this.onFavorite(item, isFavorite);
            }}
            key={projectModel.item.id}
            onSelect={() => this.onSelect(projectModel)}
            projectModel={projectModel}/>
    }

    componentDidMount() {
        this.loadData(true);
    }

    componentWillReceiveProps(nextProps) {
        this.loadData(false);
    }


    getDataSource(data) {
        return this.state.dataSource.cloneWithRows(data);
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    loadData(isShowLoading) {
        this.setState({
            isLoading: isShowLoading
        })
        this.favoriteDao.getAllItems()
            .then(items => {
                var resultData = [];
                for (let i = 0; i < items.length; i++) {
                    resultData.push(new ProjectModel(items[i], true));
                }
                this.updateState({
                    isLoading: false,
                    dataSource: this.getDataSource(resultData),
                })
            })
            .catch(e => {
                this.updateState({
                    isLoading: false,
                })
            })
    }

    /**
     * 点击收藏的回调函数
     * @param item
     * @param isFavorite
     */
    onFavorite(item, isFavorite) {
        // console.log(`item =${JSON.stringify(item)}
        // isFavorite =${isFavorite}`);
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item))
        } else {
            this.favoriteDao.removeFavoriteItem(item.id.toString());
        }
    }

    _refresh() {
        this.loadData();
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
