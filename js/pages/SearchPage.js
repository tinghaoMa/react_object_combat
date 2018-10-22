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
    Platform,
    TextInput,
    TouchableOpacity,
    ListView
} from 'react-native';
import ViewUtils from "../utils/ViewUtils";
import GlobalStyles from '../../res/styles/GlobalStyles';
import Toast, {DURATION} from 'react-native-easy-toast';
import FavoriteDao from '../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../expand/dao/DataRepository'
import Utils from "../utils/Utils";
import ProjectModel from "../model/ProjectModel";
import RepostoryCell from '../common/RepostoryCell'

const API_URL = 'https://api.github.com/search/repositories?sort=stars&q=';
export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        this.state = {
            rightButtonText: '搜索',
            isLoading: false,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    loadData() {
        this.updateState({
            isLoading: true,
        });
        let url = this.getUrl(this.text);
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!this || !data || !data.items || data.items.length === 0) {
                    this.refs.toast.show('啥子都没找到，不好意思', DURATION.LENGTH_SHORT);
                    this.updateState({isLoading: false, rightButtonText: '搜索'})
                    return;
                }
                this.items = data.items;
                this.getFavoriteKeys();
            })
            .catch(e=>{
                this.updateState({isLoading: false, rightButtonText: '搜索'})
            })
    }

    getFavoriteKeys() {
        this.favoriteDao.getFavoriteKeys()
            .then(keys => {
                this.favoriteKeys = keys ? keys : [];
                this.flushFavoriteState();
            })
            .catch(e => {
                this.flushFavoriteState();
            })
    }

    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let isFavorite = Utils.checkFavorite(item, this.favoriteKeys);
            projectModels.push(new ProjectModel(item, isFavorite));
        }
        this.updateState({
            isLoading: false,
            dataSource: this.getDataSource(projectModels),
            rightButtonText: '搜索'
        })
    }

    getDataSource(data) {
        return this.state.dataSource.cloneWithRows(data);
    }

    getUrl(key) {
        return API_URL + key
    }

    render() {
        let statusBar = null;
        if (Platform.OS === 'ios') {
            statusBar = <View style={[styles.status, {backgroundColor: '#2196f3'}]}/>

        }
        return <View style={GlobalStyles.root_container}>
            {statusBar}
            {this.rendNavBar()}
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data) => this._renderRow(data)}
            />
            <Toast ref={'toast'}/>
        </View>
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
    onSelect(projectModel) {
        const {navigation} = this.props;
        navigation.navigate('WebViewPage', {
            refresh: () => {
                this._refresh();
            },
            projectModel: projectModel,
        });
    }

    _refresh() {
        this.loadData();
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


    rendNavBar() {
        let backBtn = ViewUtils.getButton(require('../../res/images/ic_arrow_back_white_36pt.png'), () => {
            this.refs.input.blur();
            this.props.navigation.pop();
        })
        let inputView = <TextInput
            ref={'input'}
            style={styles.input}
            defaultValue={'js'}
            onChangeText={text => this.text = text}
        />;
        let rightButton = <TouchableOpacity
            onPress={() => {
                this.refs.input.blur();
                this.onSearchBtnClick()
            }}
        >
            <View style={{marginRight: 10}}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>{this.state.rightButtonText}</Text>
            </View>


        </TouchableOpacity>
        return <View style={{
            backgroundColor: '#2196f3',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,

        }}>
            {backBtn}
            {inputView}
            {rightButton}
        </View>
    }

    onSearchBtnClick() {
        if (this.state.rightButtonText === '搜索') {
            this.updateState({
                rightButtonText: '取消'
            })
            this.loadData();
        } else {
            this.updateState({
                rightButtonText: '搜索',
                isLoading: false,
            })
        }

    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
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
        flex: 1,
        height: (Platform.OS === 'ios') ? 30 : 40,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: 'white',
        alignSelf: 'center',
        marginRight: 10,
        borderRadius: 3,
        opacity: 0.7,
        color: 'white',
    },
    status: {
        height: 20
    }
});
