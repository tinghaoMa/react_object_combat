import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class TrendingCell extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <TouchableOpacity
            style={styles.container}
            onPress={this.props.onSelect}
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>{this.props.data.fullName}</Text>
                <Text style={styles.description}>{this.props.data.description}</Text>
                <Text style={styles.description}>{this.props.data.meta}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.description}>Build By:</Text>
                        {
                            this.props.data.contributors.map((result, i, arr) => {
                                return <Image
                                    key={i}
                                    style={{width: 22, height: 22, margin: 2}}
                                    source={{uri: arr[i]}}
                                />
                            })
                        }
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
    cell_container: {
        padding: 10,
        margin: 5,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 2,
        elevation: 5,
    },
});
