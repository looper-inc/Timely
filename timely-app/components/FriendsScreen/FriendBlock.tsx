import React from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native'

function FriendBlock({ item, onPress, ...rest }: any) {
    return (
        <TouchableWithoutFeedback onPress={() => onPress(item)}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default FriendBlock


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flex: 1
    },
    title: {
        fontSize: 32,
    },
});