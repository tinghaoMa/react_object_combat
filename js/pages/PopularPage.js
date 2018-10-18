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
import DataRepository from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import Toast, {DURATION} from 'react-native-easy-toast'

const URL = 'https://api.github.com/search/repositories?s=stars&q=';

export default class PopularPage extends React.Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            language: [],
        }
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
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    language: result
                })
            })
            .catch(error => {
                    console.log('获取自定义标签出错' + error)
                }
            )
    }

    render() {
        let content = this.state.language.length > 0 ? this.renderContent() : null;
        return <View style={styles.container}>
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
            {this.state.language.map((value, index, arr) => {
                let item = arr[index];
                return item.checked ? <PopularTab
                    key={index}
                    tabLabel={item.path}
                    {...this.props}
                >{item.name}
                    </PopularTab> : null;
            })}
        </ScrollableTabView>
    }
}

class PopularTab extends React.Component {

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
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

    onSelect(item) {
        const {navigation} = this.props;
        navigation.navigate('WebViewPage',{
            item:item,
        });
    }

    _renderRow(data) {
        return <RepostoryCell
            onSelect={() => this.onSelect(data)}
            data={data}/>
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({
            isLoading: true
        })
        let url = this.getUrl(this.props.tabLabel);
        this.dataRepository.fetchRepository(url)
            .then(result => {
                //发送通知
                DeviceEventEmitter.emit('showToast', '刷新成功');
                let items = result && result.items ? result.items : result ? result : [];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false
                })

                if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
                    return this.dataRepository.fetchNetRepository(url);
                }

            })
            .then(items => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    getUrl(key) {
        return URL + key
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
