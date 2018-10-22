import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, ViewPropTypes
} from 'react-native';

export const MORE_MENU = {
    Custom_Language: 'custom language',
    Sort_Language: 'sort language',
    Custom_Key: 'custom key',
    Sort_Key: 'sort key',
    Remove_Key: 'remove key',
    About_Author: 'about author',
    About: 'about',
    Custom_Theme: 'custom theme',
    WebSite: 'web site',
    FeedBack: 'feedback',
    Share: 'share'
}
import Popover from '../common/Popover';
import PropTypes from 'prop-types';

export default class MoreMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: [],
        }
    }

    static propTypes = {
        contentStyle: ViewPropTypes.style,
        menus: PropTypes.array.isRequired,
        anchorView: PropTypes.object,
    }

    render() {
        return <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement='bottom'
            contentMarginRight={10}
            contentStyle={
                {
                    backgroundColor: '#343434',
                    opacity: 0.8,
                }
            }
            onClose={() => this.closePopover()}>
            {this.props.menus.map((result, i, arr) => {
                return <TouchableOpacity
                    key={i}
                    underlayColor={'transparent'}
                    onPress={() => {
                        this.onMenuSelect(arr[i]);
                    }}
                >
                    <Text
                        style={{fontSize: 18, color: 'white', padding: 8}}
                    >{arr[i]}</Text>
                </TouchableOpacity>
            })}

        </Popover>
    }

    closePopover() {
        this.setState({
            isVisible: false
        });
    }

    open(){
        this.showPopover();
    }
    showPopover() {
        let anchorView = this.props.anchorView;
        if (!anchorView) return;
        anchorView.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    onMenuSelect(menu) {
        this.closePopover();
        console.log(menu);
    }
}