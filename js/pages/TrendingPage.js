import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity,
    Image
} from 'react-native';
import TrendingCell from '../common/TrendingCell'
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationBar from "../common/NavigationBar";
import TimeSpan from '../model/TimeSpan';
import Popover from '../common/Popover';
import Utils from '../utils/Utils';

var timeSpanTextArray = [
    new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'),
    new TimeSpan('本 月', 'since=monthly')];

const URL = 'https://github.com/trending/';

export default class TrendingPage extends React.Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            language: [],
            isVisible: false,
            buttonRect: [],
            timeSpan: timeSpanTextArray[0],
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
        let timeSpanView =
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                placement='bottom'
                contentStyle={
                    {
                        backgroundColor: '#343434',
                        opacity: 0.8,
                    }
                }
                onClose={() => this.closePopover()}>
                {timeSpanTextArray.map((result, i, arr) => {
                    return <TouchableOpacity
                        key={i}
                        underlayColor={'transparent'}
                        onPress={() => {
                            this._onSeleceTimeSpan(arr[i]);
                        }}
                    >
                        <Text
                            style={{fontSize: 18, color: 'white', padding: 8}}
                        >{arr[i].showText}</Text>
                    </TouchableOpacity>
                })}

            </Popover>

        return <View style={styles.container}>
            <NavigationBar
                titleView={this.renderTitleView()}
            />
            {content}
            {timeSpanView}
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
                return item.checked ? <TrendingTab
                    key={index}
                    tabLabel={item.name}
                    timeSpan={this.state.timeSpan}
                    {...this.props}
                >{item.name}
                </TrendingTab> : null;
            })}

        </ScrollableTabView>
    }

    renderTitleView() {
        return <View>
            <TouchableOpacity
                ref='button'
                onPress={() => {
                    this.showPopover();
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: 'white', fontWeight: '400'}
                    }>趋势</Text>
                    <Image
                        style={{width: 12, height: 12, marginLeft: 5}}
                        source={require('../../res/images/ic_spinner_triangle.png')}/>
                </View>
            </TouchableOpacity>
        </View>;

    }

    closePopover() {
        this.setState({
            isVisible: false
        });
    }

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    _onSeleceTimeSpan(timeSpan) {
        this.closePopover();
        this.setState({
            timeSpan: timeSpan,
        })
    }
}

class TrendingTab extends React.Component {

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isLoading: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timeSpan !== this.props.timeSpan) {
            this.loadData(nextProps.timeSpan);
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
                        onRefresh={() => this.onRefresh()}
                        colors={['red', 'green', 'orange']}
                    />
                }
            />

        </View>
    }

    onRefresh() {
        this.loadData(this.props.timeSpan);
    }

    onSelect(item) {
        console.log(JSON.stringify(item));
        const {navigation} = this.props;
        navigation.navigate('WebViewPage', {
            item: item,
        });
    }

    _renderRow(data) {
        return <TrendingCell
            onSelect={() => this.onSelect(data)}
            data={data}/>
    }

    componentDidMount() {
        this.loadData(this.props.timeSpan, true);
    }

    updateState(dic){
        if(!this) return;
        this.setState(dic);

    }
    loadData(timeSpan, isRefresh) {
        this.updateState({
            isLoading: true
        })
        let url = this.getUrl(timeSpan, this.props.tabLabel);
        console.log(`url = ${url}`);
        this.dataRepository.fetchRepository(url)
            .then(result => {
                //发送通知
                DeviceEventEmitter.emit('showToast', '刷新成功');
                let items = result && result.items ? result.items : result ? result : [];
                this.updateState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false
                })

                if (result && result.update_date && !Utils.checkDate(result.update_date)) {
                    return this.dataRepository.fetchNetRepository(url);
                }

            })
            .then(items => {
                this.updateState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false
                })
            })
            .catch(error => {
                this.updateState({
                    result: JSON.stringify(error)
                })
            })
    }

    getUrl(timeSpan, category) {
        return URL + category + '?' + timeSpan.searchText;
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
