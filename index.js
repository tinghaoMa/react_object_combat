/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import PopularPage from './js/pages/PopularPage'
import AsyncStoragePage from './js/pages/AsyncStoragePage'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AsyncStoragePage);
