import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Circle = () => {
    return(
        <View>
            <Text>
                Circle
            </Text>
            <View style={styles.ball}/>
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