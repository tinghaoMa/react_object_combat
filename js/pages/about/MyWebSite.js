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
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../utils/ViewUtils';

export default class MyWebSite extends React.Component {

    constructor(props) {
        super(props);
        let url = this.props.navigation.getParam('url', '');
        let title = this.props.navigation.getParam('title', '');
        this.state={
            url:url,
            title:title
        }
    }


    render() {
        return <View style={styles.container}>
            <NavigationBar
                title={this.state.title}
                leftButton={ViewUtils.getButton(require('../../../res/images/ic_arrow_back_white_36pt.png'), () => {
                    this._onBackClick();
                })}

            />
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