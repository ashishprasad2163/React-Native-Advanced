import React,{ useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native'

const Circle = () => {
    const position = useRef(new Animated.ValueXY(0,0)).current;
    useEffect(() => {
        Animated.spring(position,{
            toValue: { x: 200 , y : 500},
            useNativeDriver: false,
        }).start();
    },[position]);
    return(
        <View>
            <Text>
                Circle
            </Text>
            <Animated.View style={position.getLayout()}>
            <View style={styles.ball}/>
            </Animated.View>
        </View>
    )
};

export default Circle;

const styles = StyleSheet.create(
    {
        ball: {
            height: 90,
            width: 90,
            borderRadius: 1000,
            backgroundColor: 'black',
        }

})