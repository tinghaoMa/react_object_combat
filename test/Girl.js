/**
 * @author itck_mth
 * @time 2018/10/11 11:13 AM
 * @class describe
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Girl extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    I am girl
                </Text>
                <Text style={styles.text}>
                   我收到了男孩收到的 {this.props.word}
                </Text>

                <Text style={styles.text}
                      onPress={()=>{
                           this.props.onCallBack('一盒巧盒力');
                           this.props.navigator.pop() //返回上一级页面
                      }}
                >送巧克力给男孩</Text>
            </View>
        )
    }

}

const styles =StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:'red',
       justifyContent:'center'
   },

    text:{
       fontSize:22,
    }
});