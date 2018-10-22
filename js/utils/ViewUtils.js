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
    TouchableHighlight,
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

    static getSettingItem(callback, icon, text, tintStyle, expandableIcon) {
        return <TouchableHighlight
            onPress={callback}
        >
            <View>
                <View style={styles.item}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            resizeMode={'stretch'}
                            style={[{width: 16, height: 16, marginRight: 10}, tintStyle]}
                            source={icon}
                        />
                        <Text>
                            {text}
                        </Text>
                    </View>
                    <Image
                        style={[{
                            marginRight: 10,
                            height: 22,
                            width: 22
                        },
                            tintStyle
                        ]}
                        source={expandableIcon?expandableIcon:require('../../res/images/ic_tiaozhuan.png')}
                    />
                </View>
            </View>
        </TouchableHighlight>
    }

    static getMoreButton(callback){
        return <TouchableHighlight
            underlayColor={'transparent'}
            ref={'moreMenuButton'}
            style={{padding:5}}
            onPress={callback}
        >
            <View style={{paddingRight:8}}>
                <Image
                    style={{width:22, height: 22}}
                    source={require('../../res/images/ic_more_vert_white_48pt.png')}
                />
            </View>

        </TouchableHighlight>;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        height: 60,
    }

});