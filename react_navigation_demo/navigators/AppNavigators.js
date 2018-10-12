/**
 * @author itck_mth
 * @time 2018/10/11 4:25 PM
 * @class describe
 */

import {
    createStackNavigator,
    createDrawerNavigator,
} from 'react-navigation'

import {createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import React from 'react';
import {
    Button
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomePage from '../pages/HomePage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';

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



export const DrawerNav=createDrawerNavigator({

    Page4:{
        screen:Page4,
        navigationOptions:{
            drawerLabel:'Page4',
            drawerIcon:(({tintColor})=>(
                <MaterialIcons
                    name={'drafts'}
                    size={24}
                    style={{color:tintColor}}
                />
            ))
        }
    },

    Page5:{
        screen:Page5,
        navigationOptions:{
            drawerLabel:'Page5',
            drawerIcon:(({tintColor})=>(
                <MaterialIcons
                    name={'drafts'}
                    size={24}
                    style={{color:tintColor}}
                />
            ))
        }
    },

},{
    initialRouteName: 'Page4',
    drawerWidth: 300
});

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
        } ,
        DrawNav: {
            screen: DrawerNav,
            navigationOptions: {
                title: 'This is DrawNav'
            }
        }

    }, {
        navigationOptions: {
            // header: null,
        }
    }
);