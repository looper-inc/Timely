
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';


const NewEventButton = ({ ...rest }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
    );
};

export default NewEventButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Roboto',
    },
});