/**
 * @author itck_mth
 * @time 2018/10/11 12:03 PM
 * @class describe
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ViewPropTypes,
    Platform,
    StatusBar
} from 'react-native';

const NAVBAR_HEIGHT_ANDROID = 50;
const NAVBAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const STATUS_BAR_SHAPE={
    backgroundColor:PropTypes.string,
    barStyle:PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hidden:PropTypes.bool,
};

export default class NavigationBar extends Component {

    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        hide: PropTypes.bool,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar:PropTypes.shape(STATUS_BAR_SHAPE),
    }
    static defaultProps={
       statusBar:{
           barStyle:'light-content',
           hidden:false,
       }
    }

    constructor() {
        super();
        this.state = {
            title: '',
            hide: false,
        };
    }

    render() {
        let status=<View style={[styles.status,this.props.statusBar]}>
            <StatusBar {...this.props.statusBar}/>
        </View>
        let titleView = this.props.titleView ? this.props.titleView :
            <Text style={styles.text}>
                {this.props.title}
            </Text>
        let content = <View style={styles.navBar}>
            {this.props.leftButton}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this.props.rightButton}
        </View>
        return (
            <View style={[styles.container,this.props.style]}>
                {status}
                {content}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray'
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    navBar: {
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor:'#2196f3',
        height: Platform.OS==='ios'?NAVBAR_HEIGHT_IOS:NAVBAR_HEIGHT_ANDROID,
        flexDirection:'row'
    },
    titleViewContainer:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0,
    },
    status:{
        height:Platform.OS==='ios'?STATUS_BAR_HEIGHT:0,
    }
});