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
                          this.props.navigator.push({
                                component:Girl,
                                params:{
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
                    {this.state.word}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center'
    },
    text:{
        fontSize:20,
        color:'green'
    }
});