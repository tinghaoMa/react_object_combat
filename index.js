/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import EntryComponent from "./test/EntryComponent"
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => EntryComponent);
