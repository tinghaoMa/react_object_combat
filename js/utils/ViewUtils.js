/**
 * @author itck_mth
 * @time 2018/10/17 11:11 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class ViewUtils {

    static getButton(imageUrl, pressCallBack) {
        return <TouchableOpacity
            onPress={() => {
                pressCallBack();
            }}>
            <Image
                style={{width: 26, height: 26, margin: 10}}
                source={imageUrl}></Image>
        </TouchableOpacity>
    }

}