/**
 * @author itck_mth
 * @time 2018/10/11 4:25 PM
 * @class describe
 */

import {
    createStackNavigator,
    createTabNavigator,
    createBottomTabNavigator
} from 'react-navigation'
import React from 'react';
import {
    Button
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import HomePage from '../pages/HomePage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';

export const AppTabNavigator = createBottomTabNavigator({
    Page1: {
        screen: Page1,
        navigationOptions: {
            tabBarLabel: 'Page1',
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Icon
                        name={focused ? 'logo-android' : 'ios-add'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            tabBarLabel: 'Page2',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name={focused ? 'logo-android' : 'ios-add'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Page3: {
        screen: Page3,
        navigationOptions: {
            tabBarLabel: 'Page3',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name={focused ? 'logo-android' : 'ios-add'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    }


});

export const AppStackNavigator = createStackNavigator({
        HomePage: {
            screen: HomePage,
            // navigationOptions: () => ({
            //     title: 'HomePage',
            // }),

        },
        Page1: {
            screen: Page1,
            navigationOptions: ({navigation}) => ({
                // title: `${navigation.state.params.name}页面名`,
                title: `${navigation.getParam('name', 'default')}页面名`,
            }),
        },
        Page2: {
            screen: Page2,
            navigationOptions: () => ({
                title: 'Page2',
            }),
        },
        Page3: {
            screen: Page3,
            navigationOptions: (props) => {
                const {navigation} = props;
                const {state, setParams} = navigation;
                const {params} = state;

                return {
                    title: params.title ? params.title : 'Page3',
                    headerRight: (
                        <Button
                            title={params.mode === 'edit' ? '保存' : '编辑'}
                            onPress={() => {
                                setParams({mode: params.mode === 'edit' ? '' : 'edit'})
                            }}
                        />
                    )
                }
            },
        },

    }, {
        navigationOptions: {
            // header: null,
        }
    }
);