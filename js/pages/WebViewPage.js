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
    TextInput
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../utils/ViewUtils';

const URL = 'Http://www.imooc.com';
const API_URL = 'http://github.com/';
export default class WebViewPage extends React.Component {

    constructor(props) {
        super(props);

        const {navigation} = this.props;
        const item = navigation.getParam('item', 'no');
        this.url = item.html_url ? item.html_url : API_URL + item.fullName;
        this.title = item.full_name?item.full_name:item.fullName;
        this.state = {
            url: this.url,
            title: this.title,
            canGoBack: false,
            canGo: false,
        }
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                title={this.state.title}
                leftButton={ViewUtils.getButton(require('../../res/images/ic_arrow_back_white_36pt.png'), () => {
                    this._onBackClick();
                })}
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
        this.props.navigation.pop();
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