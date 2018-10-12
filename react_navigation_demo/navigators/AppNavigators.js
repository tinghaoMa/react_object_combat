/**
 * @author itck_mth
 * @time 2018/10/11 4:25 PM
 * @class describe
 */

import {
    createStackNavigator,
} from 'react-navigation'

import {createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import React from 'react';
import {
    Button
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import HomePage from '../pages/HomePage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';

class TabBarComponent extends React.Component {

    constructor(props) {
        super(props)
        this.theme = {
            tintColor: this.props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        const {routes, index} = this.props.navigation.state;
        const {theme} = routes[index].params?routes[index].params:this.theme;
        if (theme && theme.updateTime > this.theme.updateTime) {
            this.theme = theme;
        }

        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor || this.props.activeTintColor}
        />
    }
}


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
            ),
            // tabBarOnPress:()=>{
            //     console.log('11111111')
            // }
        }
    }
}, {
    tabBarComponent:TabBarComponent,
    tabBarOptions: {
        activeTintColor: 'green',
        activeBackgroundColor:'gray',
        labelStyle: {
            fontSize: 12,
        },
        // style: {
        //     backgroundColor: 'yellow',
        // },
        inactiveTintColor:'red'
    },
    // navigationOptions:{
    //     tabBarVisible:false,
    // }
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

        TabNav: {
            screen: AppTabNavigator,
            navigationOptions: {
                title: 'This is TabNavigator'
            }
        }

    }, {
        navigationOptions: {
            // header: null,
        }
    }
);