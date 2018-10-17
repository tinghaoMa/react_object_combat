import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
} from 'react-native';
import RepostoryCell from '../common/RepostoryCell'
import DataRepository from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';

const URL = 'https://api.github.com/search/repositories?s=stars&q=';

export default class PopularPage extends Component {

    constructor() {
        super();
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            language: [],
        }
    }

    componentDidMount() {
        this.loadData();
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
                return item.checked ? <PopularTab key={index} tabLabel={item.path}>{item.name}</PopularTab> : null;
            })}
        </ScrollableTabView>
    }
}

class PopularTab extends Component {

    constructor(props) {
        super();
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

    _renderRow(data) {
        return <RepostoryCell data={data}/>
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({
            isLoading: true
        })
        let url = this.getUrl(this.props.tabLabel);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
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
