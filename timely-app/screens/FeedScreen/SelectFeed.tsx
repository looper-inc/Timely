import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import SelectButton from '../../components/SelectButton';

const windowHeight = Dimensions.get('window').height
const SelectFeed = ({ onSelect }) => {
    return (
        <View style={styles.container}>
            <SelectButton buttonTitle='Following' onPress={() => { onSelect('Following') }} />
            <SelectButton buttonTitle='Notifications' onPress={() => onSelect('Notifications')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        display: 'flex',
        width: '100%'
    },
});
export default SelectFeed
