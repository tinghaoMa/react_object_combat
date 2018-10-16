import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text
}from 'react-native';


export default class App extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text
                    style={styles.welcome}
                    onPress={() => {
                        navigation.navigate('FlatListDemo');
                    }}
                >click me go to flatlist page</Text>
                <Text
                    style={styles.welcome}
                    onPress={() => {
                        navigation.navigate('SwipeableFlatListDemo');
                    }}
                >click me go to SwipeableFlatListDemo page</Text>


                <Text
                    style={styles.welcome}
                    onPress={() => {
                        navigation.navigate('SectionListDemo');
                    }}
                >click me go to SectionListDemo page</Text>

                <Text
                    style={styles.welcome}
                    onPress={() => {
                        navigation.navigate('ListViewDemo');
                    }}
                >click me go to ListViewDemo page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
