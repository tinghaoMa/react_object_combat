import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewPropTypes,
    Modal,
    Image,
    DeviceInfo
} from 'react-native';

import PropTypes from 'prop-types';

export default class MenuDialog extends React.Component {
    state = {
        visible: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {onClose, menus, onSelect} = this.props;
        return <Modal
            transparent={true}
            visible={this.state.visible}
            animationType={() => onClose()}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.dismiss()}
            >
                <Image
                    style={styles.arrow}
                    source={require('../../res/images/ic_computer.png')}
                />
                <View style={styles.content}>
                    {
                        menus.map((result, i, aar) => {
                            let menu = aar[i];
                            return <TouchableOpacity
                                key={i}
                                onPress={() => onSelect(aar[i])}
                                underlayColor={'transparent'}
                            >
                                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                    <Image
                                        source={menu.icon}
                                        resizeMode={'stretch'}
                                    />

                                    <Text style={styles.text}>
                                        {menu.name}
                                    </Text>
                                    {
                                        i !== menus.length - 1 ? <View style={styles.line}>


                                        </View> : null

                                    }
                                </View>

                            </TouchableOpacity>;
                        })


                    }
                </View>
            </TouchableOpacity>
        </Modal>
    }

    show() {
        this.setState({
            visible: true,
        })
    }

    dismiss() {
        console.log('modal dismiss');
        this.setState({
            visible: false,
        })
    }
}
MenuDialog.propTyes = {
    menus: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    theme: PropTypes.object,
    onClose: PropTypes.func
}

MenuDialog.defaultProps = {
    menus: [],
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end'
    },
    arrow: {
        marginTop: 56 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        width: 16,
        height: 16,
        marginRight: 18,
        resizeMode: 'contain'

    },
    content: {},
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
        paddingRight: 15,
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    }
})