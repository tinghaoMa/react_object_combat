/**
 * @author itck_mth
 * @time 2018/10/18 12:40 PM
 * @class describe
 */


import {
    createStackNavigator
} from 'react-navigation'

import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import WebViewPage from './WebViewPage';

export const AppStack = createStackNavigator({

    PopularPage: {
        screen: PopularPage
    },

    TrendingPage: {
        screen: TrendingPage
    },

    WebViewPage: {
        screen: WebViewPage
    }

},{
    navigationOptions:{
        header:null
    }
});