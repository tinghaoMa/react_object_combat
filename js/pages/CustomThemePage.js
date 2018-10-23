/**
 * @author itck_mth
 * @time 2018/10/17 10:53 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    Modal,
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';

import ThemeFactory, {ThemeFlags} from '../../res/styles/ThemeFactory'
import ThemeDao from '../expand/dao/ThemeDao';

export default class CustomThemePage extends React.Component {


    constructor(props) {
        super(props);
        const {navigation} = this.props;
        console.log(this.props.visible);
        this.themeDao = new ThemeDao();
    }

    render() {
        let view = this.props.visible ? <View>
            {this.renderContentView()}
        </View> : null
        return view;
    }


    renderContentView() {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.visible}
            onRequestClose={() => {
                this.props.onClose();
            }}
        >
            <View style={styles.modalContent}>
                <ScrollView>
                    {this.renderThemeItems()}
                </ScrollView>
            </View>
        </Modal>
    }

    renderThemeItems() {
        let views = [];
        for (let i = 0, keys = Object.keys(ThemeFlags), l = keys.length; i < l; i += 3) {
            let key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 3];
            views.push(<View key={i} style={{flexDirection: 'row'}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }

    getThemeItem(themeKey) {
        return <TouchableHighlight
            underlayColor={'white'}
            onPress={() => this.onSelectThemeItem(themeKey)}
            style={{flex: 1}}>
            <View style={[styles.themeItem, {backgroundColor: ThemeFlags[themeKey]}]}>
                <Text style={styles.themeText}>
                    {themeKey}
                </Text>
            </View>

        </TouchableHighlight>
    }

    onSelectThemeItem(themeKey) {
        this.props.onClose();
        this.themeDao.save(ThemeFlags[themeKey]);
        console.log('onSelectThemeItem  DeviceEventEmitter.emit');
        DeviceEventEmitter.emit('updateTheme', ThemeFactory.createTheme(ThemeFlags[themeKey]));
    }
}


const styles = StyleSheet.create({
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 10
    },
    modalContent: {
        flex: 1,
        margin: 10,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 3,
        opacity: 0.7,
        padding: 3
    },
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        marginRight: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',

    }
})

