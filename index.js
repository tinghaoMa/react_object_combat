/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import FlatListDemo from './pages/FlatListDemo';
import SwipeableFlatListDemo from './pages/SwipeableFlatListDemo';
import {name as appName} from './app.json';

import {createStackNavigator} from 'react-navigation'
import SectionListDemo from "./pages/ScetionListDemo";

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
    },
    SectionListDemo: {
        screen: SectionListDemo,
        navigationOptions: {
            title: 'SectionListDemo'
        }
    }

});

AppRegistry.registerComponent(appName, () => AppRoot);
