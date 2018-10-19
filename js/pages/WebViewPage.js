/**
 * @author itck_mth
 * @time 2018/10/17 10:53 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    WebView,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../utils/ViewUtils';
import FavoriteDao from '../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../expand/dao/DataRepository'
const URL = 'Http://www.imooc.com';
const API_URL = 'http://github.com/';
export default class WebViewPage extends React.Component {

    constructor(props) {
        super(props);

        const {navigation} = this.props;
        const projectModel = navigation.getParam('projectModel', 'no');
        this.url = projectModel.item.html_url ? projectModel.item.html_url : API_URL + projectModel.item.fullName;
        this.title = projectModel.item.full_name ? projectModel.item.full_name : projectModel.item.fullName;

        this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
        console.log(`projectModel.isFavorite =${projectModel.isFavorite}`)
        this.state = {
            url: this.url,
            title: this.title,
            canGoBack: false,
            canGo: false,
            isFavorite: projectModel.isFavorite,
            favoriteIcon: this.getImageIcon(projectModel.isFavorite)
        }
    }

    getImageIcon(isFavorite) {
        return isFavorite ? require('../../res/images/ic_star.png') :
            require('../../res/images/ic_star_navbar.png');
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                title={this.state.title}
                leftButton={ViewUtils.getButton(require('../../res/images/ic_arrow_back_white_36pt.png'), () => {
                    this._onBackClick();
                })}
                rightButton={this.renderRightButton()}
            />
            {/* 隐藏输入框
            <View style={styles.row}>
                <Text style={styles.welcome}
                      onPress={() => this._goBack()}>返回</Text>
                <TextInput style={styles.input}
                           defaultValue={URL}
                           onChangeText={text => this.text = text}
                />
                <Text style={styles.welcome}
                      onPress={() => this._go()}>前往</Text>
            </View>
            */}
            <WebView
                source={{uri: this.state.url}}
                startInLoadingState={true}
                onNavigationStateChange={
                    (e) => this._onNavigationStateChange(e)
                }
                ref={webView => this.webView = webView}
            />
            <Toast ref={toast => this.toast = toast}/>
        </View>;
    }


    _goBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.toast.show('已经到顶了', DURATION.LENGTH_SHORT);
        }
    }

    _go() {
        this.setState({
            url: this.text,
        })
    }

    _onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
        })
    }

    _onBackClick() {
        this.props.navigation.state.params.refresh();
        this.props.navigation.pop();
    }

    renderRightButton() {
        return <TouchableOpacity
            onPress={() => {

                let isFavorite = !this.state.isFavorite;
                this.setState({
                    isFavorite: isFavorite,
                    favoriteIcon: this.getImageIcon(isFavorite)
                });
                this.onRightBtnClick(isFavorite);
            }}>
            <Image
                style={{width: 26, height: 26, margin: 10}}
                source={this.state.favoriteIcon}
            />

        </TouchableOpacity>
    }

    onRightBtnClick(isFavorite) {
        this.props.navigation.state.params.projectModel.isFavorite = !this.state.isFavorite;
        let projectModel = this.props.navigation.state.params.projectModel;
        let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if(isFavorite){
            this.favoriteDao.saveFavoriteItem(key,
                JSON.stringify(projectModel.item))
        }else{
            this.favoriteDao.removeFavoriteItem(key);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 15,
        backgroundColor: 'blue',
        color: 'white',
        margin: 10,
    },
    input: {
        height: 40,
        flex: 1,
        borderColor: 'red',
        borderWidth: 1,
        borderTopWidth: 2,
        margin: 2,
    },
    line: {
        height: 0.3,
        backgroundColor: 'black'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    }
});