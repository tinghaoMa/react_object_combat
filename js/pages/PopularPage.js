import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

import DataRepository from '../expand/dao/DataRepository'

const URL = 'https://api.github.com/search/repositories?s=stars&q=';

export default class PopularPage extends Component {

    constructor(props) {
        super();
        this.dataRepository = new DataRepository();
        this.state = {
            result: '',
        }
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.welcome}
                  onPress={() => {
                      this.onLoad();
                  }}
            >获取数据</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => this.text = text}
            />
            <Text style={styles.welcome}>'获取到的数据是'{this.state.result}</Text>
        </View>
    }

    onLoad() {
        let url = this.getUrl(this.text);
        this.dataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })

            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    getUrl(key) {
        return URL + key
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
