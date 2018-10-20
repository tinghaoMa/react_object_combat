import React from 'react';
import { Animated, Text, View } from 'react-native';

export default class MyComponent extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
        name:'mth',
    }

    componentDidMount() {
        console.log(this.props.children.length)
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 10000,              // Make it take a while
            }
        ).start();                        // Starts the animation


    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}
            >
                {this.props.children}
                {this.props.children.map((result,i,aar)=>{
                    console.log(i);
                })}
            </Animated.View>
        );
    }
}
