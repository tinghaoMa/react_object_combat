import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class RepostoryCell extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <TouchableOpacity
            style={styles.container}
            onPress={this.props.onSelect}
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>{this.props.data.full_name}</Text>
                <Text style={styles.description}>{this.props.data.description}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Author:</Text>
                        <Image
                            style={{width: 22, height: 22, margin: 2}}
                            source={{uri: this.props.data.owner.avatar_url}}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Stars:</Text>
                        <Text style={styles.welcome}>{this.props.data.stargazers_count}</Text>
                    </View>
                    <Image
                        style={{width: 22, height: 22, margin: 2}}
                        source={require('../../res/images/ic_star.png')}
                    />
                </View>
            </View>
        </TouchableOpacity>
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 15,
        margin: 2
    },
    input: {
        height: 20,
        borderWidth: 1
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    cell_container:{
        padding:10,
        margin:5,
        borderWidth:0.5,
        borderColor: '#dddddd',
        borderRadius:2,
        elevation:5,
    }
});
