/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import FlatListDemo from './pages/FlatListDemo';
import SwipeableFlatListDemo from './pages/SwipeableFlatListDemo';
import {name as appName} from './app.json';

import {createStackNavigator} from 'react-navigation'

const AppRoot = createStackNavigator({

    App: {
        screen: App,
        navigationOptions: {
            header: null
        }
    },

    FlatListDemo: {
        screen: FlatListDemo,
        navigationOptions: {
            title: 'FlatListDemoPage'
        }
    },
    SwipeableFlatListDemo: {
        screen: SwipeableFlatListDemo,
        navigationOptions: {
            title: 'SwipeableFlatListDemo'
        }
    }

});

AppRegistry.registerComponent(appName, () => AppRoot);
