import { StyleSheet, SafeAreaView, View, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import  React,{useState, useEffect, useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text } from '../Themed';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import { TouchableOpacity} from 'react-native-gesture-handler'

export const ListItem = ({title, titleComplete, image_url, onPressDetail, itemDetail}) => (


        <View style={styles.list}>
            {image_url ? <Image source={{ uri: image_url }} style={styles.defaultPic} /> :
                <View style={styles.defaultPic}>
                    <AntDesign name="picture" size={35} color="#666" />
                </View> 
            }
            <View style={styles.content}>
            <TouchableWithoutFeedback>
            <View style={styles.contentText}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.titleComplete}>Complete By: {titleComplete}</Text>
            </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={styles.editButton} onPress={() => onPressDetail(itemDetail)}>
                <AntDesign name="edit" size={20} color="#f9fafd" />
            </TouchableOpacity>
            </View>

        </View>


);


const styles = StyleSheet.create({
    list: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f9fafd',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
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
        width: '82%',
        height: '90%',
        alignSelf: 'flex-start',
        margin: 3,
    },
        editButton: {
        backgroundColor: '#20bf6b',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 3,
        marginTop: 20
    },
        titleComplete:{
        fontSize: 10,
        top: '60%',
        color: '#34495e',
        fontWeight: 'bold'
    }
});

export default ListItem;
