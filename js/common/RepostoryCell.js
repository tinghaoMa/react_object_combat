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
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: this.getImageIcon(this.props.projectModel.isFavorite)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.projectModel.isFavorite !== this.state.isFavorite) {
            this.setState({
                isFavorite: nextProps.projectModel.isFavorite,
                favoriteIcon: this.getImageIcon(nextProps.projectModel.isFavorite)
            })
        }
    }

    render() {
        let item = this.props.projectModel.item ? this.props.projectModel.item : this.props.projectModel;
        return <TouchableOpacity
            style={styles.container}
            onPress={this.props.onSelect}
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>{item.full_name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Author:</Text>
                        <Image
                            style={{width: 22, height: 22, margin: 2}}
                            source={{uri: item.owner.avatar_url}}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Stars:</Text>
                        <Text style={styles.welcome}>{item.stargazers_count}</Text>
                    </View>
                    {this.getFavrioteBtn()}
                </View>
            </View>
        </TouchableOpacity>
    }

    getFavrioteBtn() {
        return <TouchableOpacity
            onPress={() => {
                let isFavorite = !this.state.isFavorite;
                this.setState({
                    isFavorite: isFavorite,
                    favoriteIcon: this.getImageIcon(isFavorite)
                });
                this.onPressFavoritorBtn();
            }}
        >
            <Image
                style={{width: 22, height: 22, margin: 2, tintColor: 'red'}}
                source={this.state.favoriteIcon}
            />
        </TouchableOpacity>
    }

    getImageIcon(isFavorite) {
        return isFavorite ? require('../../res/images/ic_star.png') :
            require('../../res/images/ic_unstar_transparent.png');
    }

    onPressFavoritorBtn() {
        this.props.projectModel.isFavorite = !this.state.isFavorite;
        this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite);
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
    }
});
