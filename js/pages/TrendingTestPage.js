/**
 * @author itck_mth
 * @time 2018/10/17 10:53 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'

const TRENDING_URL = 'https://github.com/trending/';

export default class TrendingTestPage extends React.Component {

    constructor(props) {
        super(props);
        this.repository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            result: ''
        }
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                title='GithubTrending练习'
            />
            <TextInput
                style={styles.input}
                onChangeText={text => this.text = text}
            />
            <Text style={styles.welcome}
                  onPress={() => this._loadData()}
            >
                加载
            </Text>
            <ScrollView>
                <Text style={styles.welcome}>
                    {this.state.result}
                </Text>
            </ScrollView>
        </View>;
    }


    _loadData() {
        let url = TRENDING_URL + this.text;
        this.repository.fetchRepository(url)
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
        width: 100,
        height: 40,
        borderWidth: 1
    },
    line: {
        height: 0.3,
        backgroundColor: 'black'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});