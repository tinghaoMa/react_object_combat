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
    Image,
    ScrollView,
    Alert
} from 'react-native';
import CheckBox from 'react-native-check-box';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../utils/ViewUtils';
import ArrayUtils from '../utils/ArrayUtils';

import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class MyPage extends Component {

    constructor() {
        super();
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changedValues = [];
        this.state = {
            dataArray: []
        }
    }

    render() {
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
            <ScrollView
            >
                {this.renderView()}

            </ScrollView>
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
            { cancelable: true }
        )
    }

    rightBtnClick() {
        if (this.changedValues.length !== 0) {
            this.languageDao.save(this.state.dataArray)
        }
    }

    renderCheckBox(data) {
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => {
                this.setState({
                    isChecked: !data.checked
                })
                this._onCheckBoxClick(data);
            }}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={<Image style={{tintColor: 'green'}} source={require('../../res/images/ic_check_box.png')}/>}
            unCheckedImage={<Image style={{tintColor: 'green'}}
                                   source={require('../../res/images/ic_check_box_outline_blank.png')}/>}
        />
    }

    _onCheckBoxClick(data) {
        data.checked = !data.checked;
        this.toast.show(`click ${data.name + '----' + data.checked}`, DURATION.LENGTH_SHORT);
        ArrayUtils.updateArray(this.changedValues, data);
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) {
            return <Text style={{color: 'red'}}>
                获取到的自定义标签数据错误
            </Text>
        } else {
            let len = this.state.dataArray.length;
            let views = [];
            for (let i = 0; i <= len - 2; i += 2) {
                let item = this.state.dataArray[i];
                let nextItem = this.state.dataArray[i + 1];
                views.push(
                    <View key={i}>
                        <View style={styles.item}>
                            {this.renderCheckBox(item)}
                            {this.renderCheckBox(nextItem)}
                        </View>
                        <View style={styles.line}/>
                    </View>
                )
            }
            return views;
        }
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            })
            .catch(error => {
                    console.log('获取自定义标签出错' + error)
                }
            )
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
        flexDirection: 'row',
        alignItems: 'center'
    }
});