/**
 * @author itck_mth
 * @time 2018/10/11 11:13 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import LifecycleComponent from './LifecycleComponent'
import MyComponent from './MyComponent'

export default class EntryComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <MyComponent style={{width: 250, backgroundColor: 'powderblue'}}>
                    <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
                    <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
                    <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
                    <TestComopnent test='hello'/>
                </MyComponent>
            </View>
        )
    }


}

class TestComopnent extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.test)
    }

    render(){
        return <View>

            <Text>哈哈哈哈哈</Text>

        </View>
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    text: {
        fontSize: 20,
        color: 'blue'
    }
});