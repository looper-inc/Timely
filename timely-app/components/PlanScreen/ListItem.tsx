import { StyleSheet, SafeAreaView, View, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import  React,{useState, useEffect, useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text } from '../Themed';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import { TouchableOpacity} from 'react-native-gesture-handler'

export const ListItem = (props) => {

    const {
        title,
        titleComplete,
        edit,
        ...attributes
      } = props;

    return (
        <View style={styles.container}>
            <View style={styles.defaultPic}>
                <AntDesign name="picture" size={35} color="#666" />
            </View>
            <View style={styles.content}>
            <TouchableWithoutFeedback onPress={edit}>
            <View style={styles.contentText}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.titleComplete}>Complete By: {titleComplete}</Text>
            </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={styles.editButton} >
                <AntDesign name="edit" size={20} color="#f9fafd" />
            </TouchableOpacity>
            </View>
        
        </View>

    );

}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f9fafd',
        marginTop: 5,
    },

    title: {
      fontSize: 14,
      color: '#2c3e50',
      alignSelf: 'flex-start'
    },
    defaultPic:{
        backgroundColor: '#dcdde1',
        height: windowHeight/ 8,
        width: windowWidth / 4,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    content:{
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#ecf0f1',
        width: '95%',
        height: windowHeight/ 8,
    },
        contentText:{
        width: '80%',
        height: '90%',
        alignSelf: 'flex-start',
        margin: 3,
    },
        editButton: {
        backgroundColor: '#27ae60',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 3,
        marginTop: 20
    },
        titleComplete:{
        fontSize: 12,
        marginTop: 20,
        color: '#34495e',
        fontWeight: 'bold'
    }
});

export default ListItem;
