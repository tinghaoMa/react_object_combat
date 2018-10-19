/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import LifecycleComponent from'./test/LifecycleComponent'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => LifecycleComponent);
