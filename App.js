/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator';

import Boy from './test/Boy'

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'tab_popular'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab_popular'}
                        selectedTitleStyle={{color: 'red'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'red'}]}
                                                         source={require('./res/images/ic_polular.png')}/>}
                        badgeText="2"
                        onPress={() => this.setState({selectedTab: 'tab_popular'})}>
                        <View style={styles.page1}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab_trending'}
                        selectedTitleStyle={{color: 'blue'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('./res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'blue'}]}
                                                         source={require('./res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tab_trending'})}>
                        <View style={styles.page2}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab_favorite'}
                        selectedTitleStyle={{color: 'orange'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('./res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'orange'}]}
                                                         source={require('./res/images/ic_favorite.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tab_favorite'})}>
                        <View style={styles.page3}/>
                    </TabNavigator.Item>


                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tab_my'}
                        selectedTitleStyle={{color: 'gray'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('./res/images/ic_my.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'gray'}]}
                                                         source={require('./res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: 'tab_my'})}>
                        <View style={styles.page4}/>
                    </TabNavigator.Item>
                 </TabNavigator>*/}
                <Navigator
                    initialRoute = {{
                        component:Boy
                    }}
                    renderScene={(route, navigator)=>{
                            let Component = route.component;
                            return <Component navigator={navigator}{...route.params} />
                        }
                    }
                ></Navigator>
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
    page3: {
        flex: 1,
        backgroundColor: 'orange'
    },
    page4: {
        flex: 1,
        backgroundColor: 'gray'
    },
    image: {
        width: 22,
        height: 22
    }
});
