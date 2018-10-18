/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import PopularPage from './js/pages/PopularPage';
import AsyncStoragePage from './js/pages/AsyncStoragePage';
import MyPage from './js/pages/MyPage';
import WebViewPage from './js/pages/WebViewPage';
import SortKeyPage from './js/pages/SortKeyPage';
import TrendingTestPage from './js/pages/TrendingTestPage';
import TrendingPage from './js/pages/TrendingPage';
import {name as appName} from './app.json';

import {AppStack} from "./js/pages/AppStackNavigators";

AppRegistry.registerComponent(appName, () => AppStack);










