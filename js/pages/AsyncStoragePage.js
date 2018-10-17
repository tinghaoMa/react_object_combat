/**
 * @author itck_mth
 * @time 2018/10/17 10:15 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TextInput,
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'

const KEY = 'text';

export default class AsyncStoragePage extends Component {

    constructor() {
        super();
    }

    render() {
        return <View style={styles.container}>
            <TextInput style={styles.input}
                       onChangeText={(text) => {
                           this.text = text
                       }}

            />

            <View style={{flexDirection: 'row', backgroundColor: 'green'}}>
                <Text style={styles.welcome}
                      onPress={() => {
                          this._save();
                      }}>
                    保存
                </Text>
                <Text style={styles.welcome}
                      onPress={() => {
                          this._get();
                      }}>
                    取出
                </Text>
                <Text style={styles.welcome}
                      onPress={() => {
                          this._delete();
                      }}>
                    移除
                </Text>
            </View>
            <Toast ref={toast => this.toast = toast}/>
        </View>
    }

    _save() {
        AsyncStorage.setItem(KEY, this.text, (error) => {
            if (!error) {
                this._show('保存成功');
            } else {
                this._show('保存失败');
            }
        });
    }

    _get() {
        AsyncStorage.getItem(KEY, (error, result) => {
            if (!error && result) {
                this._show(`取出成功值为:${result}`);
            } else {
                this._show('取出失败');
            }
        })
    }

    _delete() {
        AsyncStorage.removeItem(KEY, (error) => {
            if (!error) {
                this._show('删除成功');
            } else {
                this._show('删除失败');
            }
        })
    }

    _show(msg) {
        this.toast.show(msg, DURATION.LENGTH_SHORT);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    },
    welcome: {
        fontSize: 15,
        margin: 10,
        color: 'white'
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1
    }
});
