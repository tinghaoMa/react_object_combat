/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={{color:'red'}}
                        title="Home"
                        renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')}/>}
                        badgeText="2"
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <View style={styles.page1}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        selectedTitleStyle={{color:'blue'}}
                        title="Profile"
                        renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'blue'}]} source={require('./res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'profile'})}>
                        <View style={styles.page2}/>
                    </TabNavigator.Item>
                </TabNavigator>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex: 1,
        backgroundColor: 'red'
    },
    page2: {
        flex: 1,
        backgroundColor: 'green'
    },
    image:{
        width:22,
        height:22
    }
});
