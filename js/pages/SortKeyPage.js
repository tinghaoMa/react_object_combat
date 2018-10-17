/**
 * @author itck_mth
 * @time 2018/10/17 10:53 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableHighlight
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../utils/ViewUtils';
import ArrayUtils from '../utils/ArrayUtils';
import SortableListView from 'react-native-sortable-listview'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class SortKeyPage extends React.Component {

    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: []
        }
    }

    render() {
        let order = Object.keys(this.state.checkedArray);
        return <View style={styles.container}>
            <NavigationBar
                title='自定义标签'
                leftButton={ViewUtils.getButton(require('../../res/images/ic_arrow_back_white_36pt.png'), () => {
                    this.leftBtnClick();
                })}
                rightButton={ViewUtils.getButton(require('../../res/images/ic_favorite.png'), () => {
                    this.rightBtnClick();
                })}
            />
            <SortableListView
                style={{flex: 1}}
                data={this.state.checkedArray}
                order={order}
                onRowMoved={e => {
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                    this.forceUpdate()
                }}
                renderRow={row => <SortCell data={row}/>}
            />
            <Toast ref={toast => this.toast = toast}/>
        </View>
    }


    componentDidMount() {
        this.loadData();
    }

    leftBtnClick() {
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: true}
        )
    }

    rightBtnClick() {
        if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {

        } else {
            this.getSortResult();
            this.languageDao.save(this.sortResultArray);
        }
    }

    getSortResult() {
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        for (let i = 0; i < this.originalCheckedArray.length; i++) {
            let temp = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(temp);
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
        }
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this._getCheckedItems(result);
            })
            .catch(error => {
                    console.log('获取自定义标签出错' + error)
                }
            )
    }

    _getCheckedItems(result) {
        this.dataArray = result;
        let checkedArray = [];
        for (let i = 0; i < result.length; i++) {
            let data = result[i];
            if (data.checked) {
                checkedArray.push(data);
            }
        }
        this.setState({
            checkedArray: checkedArray
        })

        this.originalCheckedArray = ArrayUtils.clone(checkedArray);
    }

}

class SortCell extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={styles.item}
            {...this.props.sortHandlers}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={styles.image} source={require('../../res/images/ic_sort.png')}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>

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
    },
    line: {
        height: 0.3,
        backgroundColor: 'black'
    },
    item: {
        padding: 25,
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    image: {
        tintColor: 'red',
        height: 16,
        width: 16,
        marginRight: 10,
        borderColor: 'orange',
        borderWidth: 1,
        opacity: 1,
    }
});