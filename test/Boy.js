/**
 * @author itck_mth
 * @time 2018/10/11 11:13 AM
 * @class describe
 */
 import  React,{Component} from 'react';
 import {
     View,
     Text,
     StyleSheet
 }  from 'react-native';

 import Girl from './Girl'

export default class Boy extends Component{
    constructor(props){
        super(props);
        this.state={
            word:''
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    I am boy
                </Text>
                <Text style={styles.text}
                      onPress={()=>{
                          this.props.navigator.push({ //跳转到下一级页面
                                component:Girl,
                                params:{ //传递的数据
                                    word:'一枝玫瑰',
                                    onCallBack:(word)=>{
                                        this.setState({
                                            word:word
                                        });
                                    }
                                }
                          })
                      }}
                >送女孩一枝玫瑰</Text>
                <Text style={styles.text}>
                    收到女孩送的礼物--{this.state.word}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gray',
        justifyContent:'center'
    },
    text:{
        fontSize:20,
        color:'blue'
    }
});