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
import AboutAuthorPage from "./about/AboutAuthorPage";
import FavoritePage from "./FavoritePage";
import SearchPage from "./SearchPage";
import MoreMenu from "../common/MoreMenu";
import CustomThemePage from "./CustomThemePage";

export const AppStack = createStackNavigator({
    MyPage2: {
        screen: MyPage2
    },

    CustomThemePage: {
        screen: CustomThemePage
    },
    PopularPage: {
        screen: PopularPage
    },
    MoreMenu: {
        screen: MoreMenu
    },


    SearchPage: {
        screen: SearchPage
    },


    AboutAuthorPage: {
        screen: AboutAuthorPage
    },
    FavoritePage: {
        screen: FavoritePage
    },


    TrendingPage: {
        screen: TrendingPage
    },

    WebViewPage: {
        screen: WebViewPage
    },
    TabPage: {
        screen: TabPage
    },
    AboutPage: {
        screen: AboutPage
    },

    MyWebSite: {
        screen: MyWebSite
    }

}, {
    navigationOptions: {
        header: null
    }
});