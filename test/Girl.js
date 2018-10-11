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
    TouchableOpacity,
    Image,
} from 'react-native';
import NavigationBar from './NavigationBar'

export default class Girl extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    renderButton(imageUrl,pressCallBack) {
        return <TouchableOpacity
                onPress={()=>{
                    pressCallBack();
                }}>
                <Image
                    style={{width: 26, height: 26, margin: 10}}
                    source={imageUrl}></Image>
        </TouchableOpacity>
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'girl'}
                    statusBar={{
                        backgroundColor: 'blue',
                    }}
                    leftButton={
                        this.renderButton(require('../res/images/ic_arrow_back_white_36pt.png'),()=>{
                            this.props.navigator.pop()
                        })
                    }

                    rightButton={
                        this.renderButton(require('../res/images/ic_star.png'),()=>{
                            console.log('111111111111');
                        })
                    }
                />
                <Text style={styles.text}>
                    I am girl
                </Text>
                <Text style={styles.text}>
                    我收到了男孩收到的 {this.props.word}
                </Text>

                <Text style={styles.text}
                      onPress={() => {
                          this.props.onCallBack('一盒巧盒力');
                          this.props.navigator.pop() //返回上一级页面
                      }}
                >送巧克力给男孩</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },

    text: {
        fontSize: 22,
    }
});