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

const URL = 'https://api.github.com/search/repositories?s=stars&q=';

export default class PopularPage extends Component {


    render() {
        return <View style={styles.container}>
            <ScrollableTabView
                renderTabBar={() =>
                    <ScrollableTabBar/>
                }
                tabBarBackgroundColor={'#2196f3'}
                tabBarActiveTextColor={'mintcream'}
                tabBarInactiveTextColor={'white'}
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}
                }
            >
                <PopularTab tabLabel='java'>JAVA</PopularTab>
                <PopularTab tabLabel='ios'>IOS</PopularTab>
                <PopularTab tabLabel='android'>Android</PopularTab>
                <PopularTab tabLabel='js'>Js</PopularTab>
                <PopularTab tabLabel='python'>Python</PopularTab>
                <PopularTab tabLabel='kotlin'>Kotlin</PopularTab>
                <PopularTab tabLabel='c++'>C++</PopularTab>
            </ScrollableTabView>
        </View>
    }


}

class PopularTab extends Component {

    constructor(props) {
        super();
        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isLoading:false,
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
                        onRefresh={()=>this.loadData()}
                        colors={['red','green','orange']}
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
            isLoading:true
        })
        let url = this.getUrl(this.props.tabLabel);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
                    isLoading:false
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
