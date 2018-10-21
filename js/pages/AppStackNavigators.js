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
import MyPage2 from "./MyPage2";
import TabPage from "./TabPage";
import AboutPage from "./about/AboutPage";
import MyWebSite from "./about/MyWebSite";

export const AppStack = createStackNavigator({

    MyPage2: {
        screen: MyPage2
    },

    PopularPage: {
        screen: PopularPage
    },


    TrendingPage: {
        screen: TrendingPage
    },

    WebViewPage: {
        screen: WebViewPage
    } ,
    TabPage: {
        screen: TabPage
    },
    AboutPage: {
        screen: AboutPage
    },
    MyWebSite: {
        screen: MyWebSite
    }

},{
    navigationOptions:{
        header:null
    }
});