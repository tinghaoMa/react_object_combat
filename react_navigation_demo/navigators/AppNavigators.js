/**
 * @author itck_mth
 * @time 2018/10/11 4:25 PM
 * @class describe
 */

import {
    StackNavigator,
    createStackNavigator,
} from 'react-navigation'

import HomePage from '../pages/HomePage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';

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
                title: `${navigation.state.params.name}页面名`,
            }),
        },
        Page2: {
            screen: Page2,
            navigationOptions: () => ({
                title: 'Page2',
            }),
        },

    }, {
        navigationOptions: {
            // header: null,
        }
    }
);