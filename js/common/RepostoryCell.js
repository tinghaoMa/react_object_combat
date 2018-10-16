import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class RepostoryCell extends Component {

    render() {
        return <View style={{backgroundColor: 'gray', margin: 10,elevation:10}}>
            <Text style={styles.welcome}>{this.props.data.full_name}</Text>
            <Text style={styles.welcome}>{this.props.data.description}</Text>
            <Text style={styles.welcome}>data.forks_count = {this.props.data.forks_count}</Text>
            <Text style={styles.welcome}>data.forks = {this.props.data.forks}</Text>
        </View>
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 15,
        margin: 10,
    },
    input: {
        height: 20,
        borderWidth: 1
    }
});
