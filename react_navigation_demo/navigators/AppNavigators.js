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
            screen: HomePage
        },
        Page1: {
            screen: Page1,
            // navigationOptions: () => ({
            //     title: 'Page1',
            //     headerBackTitle: null
            // }),
        },
        Page2: {
            screen: Page2,
            // navigationOptions: () => ({
            //     title: 'Page2',
            //     headerBackTitle: null
            // }),
        },

    }, {
        navigationOptions: {
            header: null,
        }
    }
);